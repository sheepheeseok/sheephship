package sheepback.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.AdminDto;
import sheepback.Dtos.AdminLoginInfo;
import sheepback.domain.Member;
import sheepback.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/login")
    public ResponseEntity<AdminDto> Adminlogin(@RequestBody @Valid AdminLoginInfo info, HttpServletResponse response) {
        AdminDto login = adminService.Login(info);
        if(login == null) {
            return ResponseEntity.badRequest().build();
        }else{
            Cookie cookie = new Cookie("loginId", String.valueOf(login.getAdminId()));
            Cookie cookie2 = new Cookie("name", String.valueOf(login.getName()));

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
        return ResponseEntity.ok(login);
    }

    @PostMapping("/api/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        // loginId 쿠키 삭제
        Cookie loginIdCookie = new Cookie("loginId", null);
        loginIdCookie.setPath("/");
        loginIdCookie.setMaxAge(0); // 즉시 만료

        // Grade 쿠키 삭제
        Cookie nameCookie = new Cookie("name", null);
        nameCookie.setPath("/");
        nameCookie.setMaxAge(0); // 즉시 만료

        response.addCookie(loginIdCookie);
        response.addCookie(nameCookie);

        // 필요시 세션 무효화 또는 토큰 삭제 로직 추가

        return ResponseEntity.ok().build();
    }


}
