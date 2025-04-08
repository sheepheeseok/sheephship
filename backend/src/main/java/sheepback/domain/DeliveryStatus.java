package sheepback.domain;

public enum DeliveryStatus {
    PENDING("배송준비중"),
    HIPPED("배송 중"),
    DELIVERED("배송 완료"),
    CANCELLED("배송 취소"),
    RETURNEDSTART("반품 시작"),
    RETURNING("반품 중"),
    RETURNED("반품 완료"),
    FAILED("배송 실패");

    private String description;

    DeliveryStatus(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }
}
