package sheepback.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import sheepback.mapper.ItemMapper;
import sheepback.service.ItemService;
import sheepback.service.RecentItemDto;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;

@RestController
@RequestMapping("/api/recent")
public class RecentItemCookieController {
    @Autowired
    private ItemService itemService;
    private static final String COOKIE_NAME = "recentItems";
    private static final int MAX_SIZE = 20; // 최대 저장 개수
    private static final int COOKIE_AGE = 60 * 60 * 24 * 7; // 7일

    @PostMapping("/add/{itemId}")
    public String addRecentItem(@PathVariable("itemId") Long itemId,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        // 1. 기존 쿠키 값 읽기
        List<String> recentItems = new LinkedList<>();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (COOKIE_NAME.equals(cookie.getName())) {
                    String value = URLDecoder.decode(cookie.getValue(), "UTF-8");
                    recentItems = new LinkedList<>(Arrays.asList(value.split(",")));
                }
            }
        }

        String itemIdStr = itemId.toString();
        // 2. 이미 있으면 삭제
        recentItems.remove(itemIdStr);

        // 3. 맨 뒤에 추가(최신화)
        recentItems.add(itemIdStr);

        // 4. 최대 개수 유지
        while (recentItems.size() > MAX_SIZE) {
            recentItems.remove(0);
        }

        // 5. 쿠키로 다시 저장 (쉼표로 join)
        String cookieValue = URLEncoder.encode(String.join(",", recentItems), "UTF-8");
        Cookie cookie = new Cookie(COOKIE_NAME, cookieValue);
        cookie.setPath("/"); // 전체 경로에서 사용
        cookie.setMaxAge(COOKIE_AGE); // 7일

        response.addCookie(cookie);

        return "ok";
    }

    @GetMapping("/list")
    public List<RecentItemDto> getRecentItems(HttpServletRequest request) throws Exception {
        List<Long> recentItems = new LinkedList<>();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (COOKIE_NAME.equals(cookie.getName())) {
                    String value = URLDecoder.decode(cookie.getValue(), "UTF-8");
                    for (String idStr : value.split(",")) {
                        if (!idStr.isBlank()) {
                            recentItems.add(Long.parseLong(idStr));
                        }
                    }
                }
            }
        }
        // itemMapper.getRecent(List<Long> itemIds) 호출
        Collections.reverse(recentItems);
        return itemService.getRecent(recentItems);
    }
}