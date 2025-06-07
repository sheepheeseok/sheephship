package sheepback.service;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sheepback.Dtos.AdminDto;
import sheepback.Dtos.AdminLoginInfo;
import sheepback.mapper.AdminMapper;

@Service
public class AdminService {

    @Autowired
    private AdminMapper adminMapper;
    //어드민 로그인후 어드민 계정정보 보내기

    public AdminDto Login(AdminLoginInfo info) {
        AdminDto adminDto = adminMapper.loginAdmin(info);
        if(adminDto == null) {
            return null;
        }else{
            return adminDto;
        }
    }



}
