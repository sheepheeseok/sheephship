package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.StockReservation;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface stockReservationMapper {

    void insertReservation(@Param("StockReservation") StockReservation stockReservation);

    void confirmReservation(@Param("resevationId") Long resevationId);

    void cancelReservation(@Param("reservationId") Long reservationId);

    List<String> findReservation(@Param("reservationId") List<Long> reservationId);

    Long findReservationItemDetailId(@Param("reservationId") Long reservationId);
}
