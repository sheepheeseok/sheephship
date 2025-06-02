package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.NoticeDto;
import sheepback.Dtos.NoticeListDto;
import sheepback.Dtos.SaveNoticeDto;
import sheepback.Dtos.UpdateNoticeDto;

import java.util.List;

@Mapper
public interface NoticeMapper {

    void insert(SaveNoticeDto notice);
    void update(@Param("UpdateNoticeDto") UpdateNoticeDto notice, @Param("noticeId") Long noticeId);
    void delete(@Param("noticeId") Long noticeId);


    List<NoticeListDto> getNoticeList();

    NoticeDto getNotice(@Param("noticeId") Long noticeId);
}
