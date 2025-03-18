package sheepback.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
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


    private String profilePicture;//프로필 사진

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Orders> orders = new ArrayList<>();//일대다 조인 ORDERS

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Wish> wishes = new ArrayList<>();

}
