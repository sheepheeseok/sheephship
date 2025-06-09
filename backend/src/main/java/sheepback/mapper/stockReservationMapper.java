package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import sheepback.Dtos.StockReservation;

@Mapper
public interface stockReservationMapper {

    void insertReservation(@Param("StockReservation") StockReservation stockReservation);

    void confirmReservation(@Param("itemDetailId") Long itemDetailId, @Param("memberId")String memberId,
                            @Param("stockQuantity") Long stockQuantity);

    int cancelReservation(@Param("itemDetailId") Long itemDetailId, @Param("memberId")String memberId,
                          @Param("quantity") Long stockQuantity);

    String findReservationStatus(@Param("itemDetailId") Long itemDetailId, @Param("memberId")String memberId,
                                       @Param("quantity") Long quantity);

    Long findReservationItemDetailId(@Param("reservationId") Long reservationId);
}
