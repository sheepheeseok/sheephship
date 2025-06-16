package sheepback.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import sheepback.Dtos.MessageDto;
import sheepback.domain.item.Item;
import sheepback.repository.ItemRepository;

import java.net.URI;
import java.net.http.*;
import java.net.http.HttpRequest;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ItemRepository itemRepository;

    public ChatController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @PostMapping
    public ResponseEntity<Object> chat(@RequestBody List<MessageDto> messages) {
        try {
            System.out.println("✅ 받은 메시지 목록: " + messages);

            String userInput = messages.stream()
                    .filter(m -> "user".equalsIgnoreCase(m.getRole()))
                    .reduce((first, second) -> second) // 마지막 user 메시지
                    .map(MessageDto::getContent)
                    .orElse(null);

            if (userInput == null || userInput.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("유효한 user 메시지가 없습니다.");
            }

            System.out.println("✅ 유저 입력값: " + userInput);

            List<String> knownAreas = List.of("강남", "신논현", "역삼", "홍대", "이태원", "잠실", "수유");
            String matchedArea = knownAreas.stream()
                    .filter(userInput::contains)
                    .findFirst()
                    .orElse(null);


            if (matchedArea != null && userInput.contains("클라이밍")) {
                List<String> gyms = searchClimbingGyms(matchedArea);
                String reply;

                if (!gyms.isEmpty()) {
                    reply = matchedArea + " 근처 클라이밍장:\n- " + String.join("\n- ", gyms);
                } else {
                    reply = matchedArea + " 근처에는 클라이밍장이 검색되지 않았어요.";
                }

                // ✅ JSON 구조를 Map 형태로 가공해서 반환 (문자열 아님)
                Map<String, Object> message = Map.of(
                        "role", "assistant",
                        "content", reply
                );

                Map<String, Object> choice = Map.of("message", message);

                Map<String, Object> response = Map.of("choices", List.of(choice));

                return ResponseEntity.ok(response);
            }

            if (!userInput.trim().isEmpty()) {
                try {
                    // ✅ 1. 입력에서 첫 단어만 추출
                    String searchKeyword = extractFirstWord(userInput);
                    System.out.println("🔍 상품명 앞부분 검색: " + searchKeyword);

                    // ✅ 2. item.name LIKE '검색어%'
                    List<Item> foundItems = itemRepository.findByNameStartingWith(searchKeyword);
                    System.out.println("✅ 찾은 상품 수: " + foundItems.size());

                    if (!foundItems.isEmpty()) {
                        StringBuilder sb = new StringBuilder("해당 제품을 찾았어요:\n");
                        for (Item item : foundItems.stream().limit(5).toList()) {
                            sb.append("- ")
                                    .append(item.getName() != null ? item.getName() : "이름 없음")
                                    .append(" (")
                                    .append(item.getPrice() != null ? item.getPrice() : "가격 없음")
                                    .append("원)\n");
                        }

                        Map<String, Object> message = Map.of(
                                "role", "assistant",
                                "content", sb.toString().trim()
                        );
                        Map<String, Object> choice = Map.of("message", message);
                        Map<String, Object> response = Map.of("choices", List.of(choice));
                        return ResponseEntity.ok(response);
                    } else {
                        Map<String, Object> message = Map.of(
                                "role", "assistant",
                                "content", "해당 제품을 찾을 수 없어요."
                        );
                        Map<String, Object> choice = Map.of("message", message);
                        Map<String, Object> response = Map.of("choices", List.of(choice));
                        return ResponseEntity.ok(response);
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    Map<String, Object> message = Map.of(
                            "role", "assistant",
                            "content", "❌ 상품 검색 중 오류가 발생했어요."
                    );
                    Map<String, Object> choice = Map.of("message", message);
                    Map<String, Object> response = Map.of("choices", List.of(choice));
                    return ResponseEntity.status(500).body(response);
                }
            }

            List<MessageDto> fullMessages = new ArrayList<>();
            fullMessages.add(new MessageDto("system",
                    "당신은 Sheepship이라는 클라이밍 쇼핑몰 사이트의 챗봇 양이야. 항상 공감하며 정중하고 간결하게, 20자 이내로 문장을 마무리해서 답변해."));


            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", fullMessages);

            ObjectMapper mapper = new ObjectMapper();
            String jsonBody = mapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .header("Authorization", "Bearer " + OPENAI_API_KEY)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            return ResponseEntity.ok(response.body());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("OpenAI 요청 중 오류: " + e.getMessage());
        }
    }

    // ✅ 좌표 기반 검색으로 개선
    private List<String> searchClimbingGyms(String area) throws Exception {
        Map<String, double[]> areaCoordinates = Map.of(
                "강남", new double[]{127.0276, 37.4979},
                "신논현", new double[]{127.0217, 37.5046},
                "역삼", new double[]{127.0365, 37.5007},
                "홍대", new double[]{126.9237, 37.5563},
                "이태원", new double[]{126.9945, 37.5349},
                "잠실", new double[]{127.1000, 37.5133},
                "수유", new double[]{127.0215, 37.6378}
        );

        double[] coords = areaCoordinates.getOrDefault(area, new double[]{127.0276, 37.4979});

        URI uri = UriComponentsBuilder.fromUriString("https://dapi.kakao.com/v2/local/search/keyword.json")
                .queryParam("query", "클라이밍")
                .queryParam("x", coords[0])
                .queryParam("y", coords[1])
                .queryParam("radius", 3000)
                .queryParam("size", 5)
                .build()
                .toUri();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .header("Authorization", "KakaoAK " + KAKAO_API_KEY)
                .GET()
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("📦 Kakao 응답: " + response.body());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.body());
        JsonNode documents = root.get("documents");

        List<String> gymNames = new ArrayList<>();
        if (documents != null && documents.isArray()) {
            for (JsonNode doc : documents) {
                gymNames.add(doc.get("place_name").asText());
            }
        }

        return gymNames;
    }
    private String extractFirstWord(String input) {
        // 특수문자 제거 후 공백 기준 분리
        String[] words = input.replaceAll("[^가-힣a-zA-Z0-9 ]", "").split("\\s+");
        return words.length > 0 ? words[0] : "";
    }
}
