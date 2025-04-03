package sheepback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class webConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로에 대해 CORS를 허용하고, 특정 출처를 허용
        registry.addMapping("/**")
                .allowedOrigins("http://sheepship.kro.kr") // 프론트엔드 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);  // 자격 증명(쿠키 등)을 포함하려면 true
    }
}
