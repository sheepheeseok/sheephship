package sheepback.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/api/checkId")
    public boolean checkMemberId(@RequestBody @Valid GetId id){
        boolean check = memberService.checkMemberId(id.getId());
        System.out.println("check = " + check);
        return check;
    }

    //로그인 api 값확인후 Id 쿠키로 반환
    @PostMapping("/api/login")
    public ResponseEntity<LoginMember> login(@RequestBody @Valid LoginMemberRequest loginMemberRequest,
                                             HttpServletResponse response) {

        Member login = memberService.login(loginMemberRequest.getId()
                , loginMemberRequest.getPassword());

        LoginMember loginMember = new LoginMember();
        //로그인 객체가 null이아니라면 getId반환
        if (login != null) {
            loginMember.setId(login.getId());

            Cookie cookie = new Cookie("loginId", String.valueOf(login.getId()));
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 24 * 7);
            response.addCookie(cookie);
        }
        if (login == null) {
            return ResponseEntity.badRequest().build(); // 로그인 실패 시 상태 코드 400 반환
        }

        return ResponseEntity.ok(loginMember);
    }


    //아이디 찾기 찾은후 id 반환 없으면 null
    @GetMapping("/api/findId")
    public String findId(@RequestBody @Valid FindIdDto findIdDto) {

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

    //멤버정보 가져오기
    @PostMapping("/api/updateMemberInfo")
    public MyPageDto getById(@RequestParam("id") String id) {
        Member member = memberService.getMemberById(id);

        MyPageDto findByIdDto = new MyPageDto(member.getId(), member.getName(),
                member.getGrade(), member.getPoint());
        return findByIdDto;

    }

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
    public UpdateMemberDto updateMember(@RequestBody @Valid UpdateMember updatemember) {
        Member member = memberService.updateMember(updatemember.getId(),
                updatemember.getPassword(),
                updatemember.getName(),
                updatemember.getAddress(),
                updatemember.getEmail(),
                updatemember.isAgreeTerms(),
                updatemember.isAgreeAge(),
                updatemember.isAgreeMarketing());

        UpdateMemberDto newupdateMember = new UpdateMemberDto();
        newupdateMember.setId(member.getId());
        newupdateMember.setName(member.getName());
        newupdateMember.setGrade(member.getGrade());
        newupdateMember.setPoint(member.getPoint());
        return  newupdateMember;
    }

    @Data
    private static class UpdateMemberDto{
        String id;
        String name;
        Grade grade;
        Long point;

    }

    @Data
    private static class MyPageDto{
        String id;
        String name;
        Grade grade;
        Long point;

        public MyPageDto(String id, String name, Grade grade, Long point) {
            this.id = id;
            this.name = name;
            this.grade = grade;
            this.point = point;
        }
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

    @Data
    private static class GetId {
        String id;

    }

    @Data
    private static class FindIdDto {

    }
}
