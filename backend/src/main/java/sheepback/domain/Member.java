package sheepback.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@DynamicInsert

public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_num")
    private Long number; //고유 회원번호

    @NotNull
    private String id; //아이디

    @NotNull
    private String name; //이름

    @NotNull
    private String password; //비밀번호

    @NotNull
    private String email; // 이메일

    @Enumerated(EnumType.STRING)
    private Grade grade;//회원 등급 RED, YELLOW, NAVY, PURPLE, BROWN, BLACK

    @Embedded
    private Address address; //주소 임베디드타입

    @ColumnDefault("0")
    private Long point;//포인트

    private String phoneNumber;


    private String profilePicture;//프로필 사진

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Orders> orders = new ArrayList<>();//일대다 조인 ORDERS

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItemQuestion> questions = new ArrayList<>();



    //회원가입 빌더패턴 ( 다수의 생성자 만들지않는 장점 )
    @Builder
    public Member(String id, String name, String password, String email, String phoneNumber,  Address address, String profilePicture) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.grade = Grade.RED;
        this.address = address;
        this.point = 0L;
        this.profilePicture = profilePicture;

    }

    public Member() {

    }
}
