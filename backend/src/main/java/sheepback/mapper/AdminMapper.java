package sheepback.mapper;

import org.apache.ibatis.annotations.Mapper;
import sheepback.Dtos.AdminDto;
import sheepback.Dtos.AdminLoginInfo;

@Mapper
public interface AdminMapper {
    AdminDto loginAdmin(AdminLoginInfo info);
}
