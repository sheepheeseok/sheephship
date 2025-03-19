package sheepback.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sheepback.domain.Address;
import sheepback.domain.Member;
import sheepback.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    //회원가입
    @Transactional
    public void joinMember(Member member) {
        memberRepository.save(member);
    }
    //아이디 중복체크

    public boolean checkMemberId(String memberId) {
        return memberRepository.exisxtId(memberId);
    }

    //admin 멤버정보 전부 가져오기
    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    //로그인
    public Member login(String id, String password) {
        Member login = memberRepository.login(id, password);
        return login;

    }

    //아이디 찾기
    public List<Member> findId(String name, String phoneNumber) {
        return memberRepository.findId(name, phoneNumber);
    }

    //비밀번호 찾기
    public boolean findPassword(String id, String phoneNumber) {
        Member findbyId = memberRepository.findbyId(id);
        if (findbyId != null && findbyId.getPhoneNumber().equals(phoneNumber)) {
            return true;
        }else {
            return false;
        }
    }

    //업데이트
    public Member updateMember(String id,String password, Address address, String profilePicture) {
                Member member = memberRepository.findbyId(id);
                member.setPassword(password);
                member.setAddress(address);
                member.setProfilePicture(profilePicture);
                return member;
    }

}

