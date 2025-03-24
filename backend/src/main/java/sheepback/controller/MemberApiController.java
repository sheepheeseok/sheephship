package sheepback.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sheepback.domain.Address;
import sheepback.domain.Member;
import sheepback.service.MemberService;

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

    @PostMapping("/api/login")
    public LoginMember login(String id, String password) {

        Member login = memberService.login(id, password);
        LoginMember loginMember = new LoginMember();
        loginMember.setId(login.getId());
        loginMember.setName(login.getName());

        return loginMember;
    }


    @PostMapping("/api/findId")
    public String findId(){
        return "";
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
}
