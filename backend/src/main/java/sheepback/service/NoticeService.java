package sheepback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.NoticeDto;
import sheepback.Dtos.NoticeListDto;
import sheepback.Dtos.SaveNoticeDto;
import sheepback.Dtos.UpdateNoticeDto;
import sheepback.mapper.NoticeMapper;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;


    //공지사항 등록
    public void registNotice(SaveNoticeDto notice) {
        noticeMapper.insert(notice);
    }
    //공지사항 수정
    public void updateNotice(UpdateNoticeDto notice, Long noticeId) {
        noticeMapper.update(notice, noticeId);
    }

    //공지사항 삭제
    public void deleteNotice(Long noticeId) {
        noticeMapper.delete(noticeId);
    }

    //공지사항 리스트
    public List<NoticeListDto> getNoticeList() {
        List<NoticeListDto> noticeList = noticeMapper.getNoticeList();
        return noticeList;
    }


    //공지사항 자세한 정보들
    public NoticeDto getNotice(Long noticeId) {
       NoticeDto dto = noticeMapper.getNotice(noticeId);
       return dto;
    }

}
