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
    @Column(name = "member_id")
    private String id; //아이디

    @NotNull
    private String name; //이름

    @NotNull
    @Column(unique = true)
    private String password; //비밀번호

    @NotNull
    @Column(unique = true)
    private String email; // 이메일

    @Enumerated(EnumType.STRING)
    private Grade grade;//회원 등급 RED, YELLOW, NAVY, PURPLE, BROWN, BLACK

    @Embedded
    private Address address; //주소 임베디드타입

    private Long point;//포인트

    @Column(unique = true)
    private String phoneNumber;

    private boolean agreeTerms;

    private boolean agreeAge;

    private boolean agreeMarketing;

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
    public Member(String id, String name,
                  String password, String email,
                  String phoneNumber,  Address address,
                  boolean agreeTerms, boolean agreeAge,
                  boolean agreeMarketing) {

        this.id = id;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.grade = Grade.RED;
        this.address = address;
        this.point = 0L;
        this.agreeTerms = agreeTerms;
        this.agreeAge = agreeAge;
        this.agreeMarketing = agreeMarketing;

    }


    public Member() {

    }


}
