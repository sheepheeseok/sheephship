package sheepback.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.AdminDto;
import sheepback.Dtos.AdminLoginInfo;
import sheepback.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminDto> adminLogin(
            @RequestBody @Valid AdminLoginInfo info,
            HttpServletRequest request // 세션 관리를 위해 HttpServletRequest 추가
    ) {
        AdminDto login = adminService.Login(info);
        if (login == null) {
            return ResponseEntity.badRequest().build();
        }

        // 세션 생성 및 속성 저장
        HttpSession session = request.getSession(); // 세션 생성 (기존 세션이 없으면 새로 생성)
        session.setAttribute("adminId", login.getAdminId());
        session.setAttribute("name", login.getName());
        session.setMaxInactiveInterval(60 * 60 * 24 * 7); // 7일 유지 (초 단위)

        return ResponseEntity.ok(login);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        // 현재 세션 가져오기 (없으면 생성하지 않음)
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        return ResponseEntity.ok().build();
    }


}
