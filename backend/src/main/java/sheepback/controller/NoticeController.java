package sheepback.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sheepback.Dtos.NoticeDto;
import sheepback.Dtos.NoticeListDto;
import sheepback.Dtos.SaveNoticeDto;
import sheepback.Dtos.UpdateNoticeDto;
import sheepback.service.NoticeService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // 공지사항 등록
    @PostMapping("/add")
    public String addNotice(@RequestBody InsertNoticeDto notice) {
        SaveNoticeDto saveNoticeDto = new SaveNoticeDto();
        saveNoticeDto.setTitle(notice.getTitle());
        saveNoticeDto.setContent(notice.getContent());
        saveNoticeDto.setWriteDateTime(LocalDateTime.now());
        saveNoticeDto.setFileAddress(notice.getFileAddress());
        saveNoticeDto.setImgAddress(notice.getImgAddress());
        noticeService.registNotice(saveNoticeDto);
        return "success addNotice";
    }

    // 공지사항 수정
    @PutMapping("/update/{noticeId}")
    public String updateNotice(
            @PathVariable("noticeId") Long noticeId,
            @RequestBody UpdateNoticeDto notice) {
        noticeService.updateNotice(notice, noticeId);
        return "success updateNotice";
    }

    // 공지사항 삭제
    @DeleteMapping("/delete/{noticeId}")
    public String deleteNotice(@PathVariable("noticeId") Long noticeId) {
        noticeService.deleteNotice(noticeId);
        return "success deleteNotice";
    }

    // 공지사항 목록 조회
    @GetMapping
    public List<NoticeListDto> getNoticeList() {
        return noticeService.getNoticeList();
    }

    // 공지사항 상세 조회
    @GetMapping("/notice/{noticeId}")
    public NoticeDto getNotice(@PathVariable("noticeId") Long noticeId) {
        return noticeService.getNotice(noticeId);
    }

    @Data
    private static class InsertNoticeDto {


        private String title;
        private String content;
        private String fileAddress;
        private String imgAddress;

    }
}
