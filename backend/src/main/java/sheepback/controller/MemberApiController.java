package sheepback.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sheepback.domain.Address;
import sheepback.domain.Grade;
import sheepback.domain.Member;
import sheepback.service.MemberService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

    //회원가입 api
    @PostMapping("/api/signup")
    public String signup(@RequestBody @Valid RegisterRequest registerRequest) {

        Member member = Member.builder()
                .id(registerRequest.getId())
                .name(registerRequest.getName())
                .password(registerRequest.getPassword())
                .phoneNumber(registerRequest.getPhoneNumber())
                .address(registerRequest.getAddress())
                .email(registerRequest.getEmail())
                .agreeTerms(registerRequest.isAgreeTerms())
                .agreeMarketing(registerRequest.isAgreeMarketing())
                .agreeAge(registerRequest.isAgreeAge())
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
    public LoginMember login(@RequestBody @Valid LoginMemberRequest loginMemberRequest) {

        Member login = memberService.login(loginMemberRequest.getId()
                , loginMemberRequest.getPassword());

        LoginMember loginMember = new LoginMember();
        //로그인 객체가 null이아니라면 getId반환
        if (login != null) {
            loginMember.setId(login.getId());
            loginMember.setName(login.getName());
        }

        return loginMember;
    }


    //아이디 찾기 찾은후 id 반환 여러 id가 있을경우 생각하여 List 형태로 반환
    @GetMapping("/api/findId")
    public String findId(@RequestParam("name") String name,
                               @RequestParam("phoneNumber") String phoneNumber) {

        String id = memberService.findId(name, phoneNumber);



            return id;

    }

    //비밀번호 찾기 아이디와 핸드폰 번호가 일치하다면 true반환시켜 비밀번호 바꾸기
    @PostMapping("/api/findPassword")
    public boolean findPassword(@RequestBody @Valid FindPasswordRequest pwRequest) {
        boolean checkInfo = memberService.findPassword(pwRequest.getId(), pwRequest.getPhoneNumber());
        return checkInfo;
    }

    //관리자 (멤버정보 전부 가져오기) 엔티티 직접반환대신 엔티티를 dto로 만들어 사용
    @PostMapping("/api/admin/getAllMembers")
    public List<MemberDto> getAllMembers() {
        List<Member> members = memberService.getMembers();
        List<MemberDto> memberDtos = members.stream().map(member -> new MemberDto(member))
                .collect(Collectors.toList());
        return memberDtos;
    }

//    //멤버정보 가져오기
//    @PostMapping("/api/updateMemberInfo")
//    public UpdateMemberDto getById(@RequestParam("id") String id) {
//        Member member = memberService.getMemberById(id);
//
//    }

    //마이페이지 이름 등급 포인트

    //비밀번호 변경
    @PostMapping("/api/changePassword")
    public String changePassword(@RequestBody @Valid ChangePw pw) {
        String s = memberService.updatePassword(pw.getId(), pw.getNewPassword());
        return s;
    }
    //이메일
    //회원 정보 업데이트
    @PostMapping("/api/updateMember")
    public UpdateMember updateMember(@RequestBody @Valid UpdateMember updatemember) {
        Member member = memberService.updateMember(updatemember.getId(),
                updatemember.getPassword(),
                updatemember.getName(),
                updatemember.getAddress(),
                updatemember.getEmail(),
                updatemember.isAgreeTerms(),
                updatemember.isAgreeAge(),
                updatemember.isAgreeMarketing());

        UpdateMember newupdateMember = new UpdateMember();
        newupdateMember.setId(member.getId());
        newupdateMember.setName(member.getName());
        newupdateMember.setAddress(member.getAddress());
        newupdateMember.setEmail(member.getEmail());
        return  newupdateMember;
    }

    @Data
    private static class UpdateMemberDto{

    }


    @Data
    private static class MemberDto{
        String id;
        String name;
        String password;
        Address address;
        String phoneNumber;
        String email;
        Grade grade;
        Long point;

        public MemberDto(Member member) {
            this.id = member.getId();
            this.name = member.getName();
            this.password = member.getPassword();
            this.address = member.getAddress();
            this.phoneNumber = member.getPhoneNumber();
            this.email = member.getEmail();
            this.grade = member.getGrade();
            this.point = member.getPoint();
        }
    }

    @Data
    private static class RegisterRequest {
        String id;
        String name;
        String password;
        Address address;
        String phoneNumber;
        String email;
        boolean agreeTerms;
        boolean agreeMarketing;
        boolean agreeAge;
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
        String email;
        boolean agreeTerms;
        boolean agreeMarketing;
        boolean agreeAge;
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

    @Data
    private static class ChangePw {
        String id;
        String newPassword;
    }
}
