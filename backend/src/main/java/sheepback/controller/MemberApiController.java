package sheepback.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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
import sheepback.repository.MemberQuery.OrderMemberDto;
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
    @PostMapping("/api/deleteMember")
    public String deleteMeber(@RequestBody @Valid GetId id){
        Member deleteMember = memberService.getMemberById(id.getId());
        memberService.deleteMember(deleteMember);
        return "삭제완료";
    }

    //이이디 중복체크
    @PostMapping("/api/checkId")
    public boolean checkMemberId(@RequestBody @Valid GetId id){
        boolean check = memberService.checkMemberId(id.getId());
        System.out.println("check = " + check);
        return check;
    }


    @GetMapping("/api/getAddress/{id}")
    public OrderMemberDto getmemberAddressById(@PathVariable("id") String id){
        OrderMemberDto orderMemberById = memberService.getOrderMemberById(id);
        return orderMemberById;
    }

    //로그인 api 값확인후 Id 쿠키로 반환 d
    @PostMapping("/api/login")
    public ResponseEntity<LoginMember> login(@RequestBody @Valid LoginMemberRequest loginMemberRequest,
                                             HttpServletResponse response
    , HttpServletRequest req) {

        Member login = memberService.login(loginMemberRequest.getId()
                , loginMemberRequest.getPassword());

        LoginMember loginMember = new LoginMember();
        //로그인 객체가 null이아니라면 getId반환
        if (login != null) {
            loginMember.setId(login.getId());
        //등급도 저장해주기
        Cookie cookie = new Cookie("loginId", String.valueOf(login.getId()));
        Cookie cookie2 = new Cookie("Grade", String.valueOf(login.getGrade()));

        HttpSession session = req.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        session = req.getSession(true);
        session.setAttribute("loginId", String.valueOf(login.getId()));
        session.setAttribute("Grade", String.valueOf(login.getGrade()));

        cookie2.setHttpOnly(false);
        cookie2.setSecure(false);
        cookie2.setPath("/");
        cookie2.setMaxAge(60 * 60 * 24 * 7);
        response.addCookie(cookie2);

        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 7);
        response.addCookie(cookie);
        }
        if (login == null) {
            return ResponseEntity.badRequest().build(); // 로그인 실패 시 상태 코드 400 반환
        }

        return ResponseEntity.ok(loginMember);
    }

    // 로그아웃 API
    @PostMapping("/api/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // loginId 쿠키 삭제
        Cookie loginIdCookie = new Cookie("loginId", null);
        loginIdCookie.setPath("/");
        loginIdCookie.setMaxAge(0); // 즉시 만료

        // Grade 쿠키 삭제
        Cookie gradeCookie = new Cookie("Grade", null);
        gradeCookie.setPath("/");
        gradeCookie.setMaxAge(0); // 즉시 만료

        response.addCookie(loginIdCookie);
        response.addCookie(gradeCookie);

        // 필요시 세션 무효화 또는 토큰 삭제 로직 추가

        return ResponseEntity.ok().build();
    }


    //아이디 찾기 찾은후 id 반환 없으면 null
    @PostMapping("/api/findId")
    public String findId(@RequestBody @Valid FindIdDto findIdDto) {

        String id = memberService.findId(findIdDto.getName(), findIdDto.getPhoneNumber());

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

    //회원정보 수정시 멤버정보 가져오기
    @PostMapping("/api/updateMemberInfo")
    public MyPageDto getById(@CookieValue(name = "loginId", required = false) String id) {

        //id반환 실패시 null반환
        if (id == null) {
            return null;
        }

        Member member = memberService.getMemberById(id);

        MyPageDto myPageDto = new MyPageDto(member.getId(), member.getName(),
                member.getGrade());

        return myPageDto;

    }

    @GetMapping("/api/OrderMemberbyId/{id}")
    public OrderMemberDto OrderMemberbyId(@PathVariable("id") String id) {
        return memberService.getOrderMemberById(id);
    }


    //비밀번호 변경
    @PostMapping("/api/changePassword")
    public String changePassword(@CookieValue(name = "loginId", required = false) String id,
                                 @RequestBody @Valid ChangePw pw) {
        String s = memberService.updatePassword(id, pw.getNewPassword());
        return s;
    }
    //이메일
    //회원 정보 업데이트
    @PostMapping("/api/updateMember")
    public UpdateMemberDto updateMember(@CookieValue(name = "loginId", required = false) String id,
                                        @RequestBody @Valid UpdateMember updatemember) {
        Member member = memberService.updateMember(id,
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

        public MyPageDto(String id, String name, Grade grade) {
            this.id = id;
            this.name = name;
            this.grade = grade;
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
        String newPassword;
    }

    @Data
    private static class GetId {
        String id;

    }

    @Data
    private static class FindIdDto {
        String name;
        String phoneNumber;
    }

}
