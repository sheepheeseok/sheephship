package sheepback.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Address;
import sheepback.domain.Member;
import sheepback.service.MemberService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    //회원가입 api
    @PostMapping("/api/signup")
    public String signup(@RequestBody RegisterRequest registerRequest) {
        Member member = Member.builder()
                .id(registerRequest.getId())
                .name(registerRequest.getName())
                .password(registerRequest.getPassword())
                .phoneNumber(registerRequest.getPhoneNumber())
                .address(registerRequest.getAddress())
                .email(registerRequest.getEmail())
                .build();
        memberService.joinMember(member);
        return "회원가입 성공";
    }

    //이이디 중복체크
    @GetMapping("/api/checkId/{id}")
    public boolean checkMemberId(@PathVariable("id") String id){
        boolean check = memberService.checkMemberId(id);
        return check;
    }

    //로그인 api 값확인후 로그인 필드 반환
    @PostMapping("/api/login")
    public LoginMember login(@RequestBody LoginMemberRequest loginMemberRequest) {

        Member login = memberService.login(loginMemberRequest.getId()
                , loginMemberRequest.getPassword());
        LoginMember loginMember = new LoginMember();
        loginMember.setId(login.getId());
        loginMember.setName(login.getName());

        return loginMember;
    }


    //아이디 찾기 찾은후 id 반환 여러 id가 있을경우 생각하여 List 형태로 반환
    @GetMapping("/api/findId")
    public List<String> findId(@RequestParam("name") String name,
                               @RequestParam("phoneNumber") String phoneNumber) {

        List<String> id = memberService.findId(name, phoneNumber);

        if (id == null) {
            return null;
        }else{
            return id;
        }
    }

    //비밀번호 찾기 아이디와 핸드폰 번호가 일치하다면 true반환시켜 비밀번호 바꾸기
    @PostMapping("/api/findPassword")
    public boolean findPassword(@RequestBody FindPasswordRequest pwRequest) {
        boolean checkInfo = memberService.findPassword(pwRequest.getId(), pwRequest.getPhoneNumber());
        return checkInfo;
    }

    //관리자 (멤버정보 전부 가져오기)
    @PostMapping("/api/admin/getAllMembers")
    public List<Member> getAllMembers() {
        List<Member> members = memberService.getMembers();
        return members;
    }

    //비밀번호 변경
    @PostMapping("/api/changePassword")
    public String changePassword(String id, String password) {
        String s = memberService.updatePassword(id, password);
        return s;
    }
    //회원 정보 업데이트
    @PostMapping("/api/updateMember")
    public UpdateMember updateMember(@RequestBody @Valid UpdateMember updatemember) {
        Member member = memberService.updateMember(updatemember.getId(),
                updatemember.getPassword(),
                updatemember.getName(),
                updatemember.getAddress(),
                updatemember.getProfilePicture());

        updatemember.setId(member.getId());
        updatemember.setName(member.getName());
        updatemember.setAddress(member.getAddress());
        updatemember.setProfilePicture(member.getProfilePicture());
        return updatemember;
    }



    @Data
    private static class RegisterRequest {
        String id;
        String name;
        String password;
        Address address;
        String phoneNumber;
        String email;
    }

    @Data
    private static class LoginMember {
        String id;
        String name;
    }


    @Data
    private static class UpdateMember {
        String id;
        String name;
        String password;
        Address address;
        String profilePicture;
    }

    @Data
    private static class LoginMemberRequest {
        String id;
        String password;
    }

    @Data
    private static class FindPasswordRequest {
        String id;
        String phoneNumber;
    }
}
