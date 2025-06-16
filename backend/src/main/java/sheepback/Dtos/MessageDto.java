package sheepback.Dtos;

public class MessageDto {
    private String role;
    private String content;

    // 기본 생성자
    public MessageDto() {}

    // 생성자 오버로드 (필요 시)
    public MessageDto(String role, String content) {
        this.role = role;
        this.content = content;
    }

    // getter & setter
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
