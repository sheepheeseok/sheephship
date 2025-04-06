package sheepback.repository.ItemQuery;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchItemSimplDto {
    private Long id;
    private String name;
    private Long price;
    private String mainUrl;
}
