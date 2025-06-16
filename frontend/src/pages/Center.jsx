import { useState } from "react";
import CenterInfoCard from "../component/CenterInfoCard.jsx";

const Center = () => {
  const [centerSelected, setCenterSelected] = useState("더 클라임");
  const [iconSelectedId, setIconSelectedId] = useState(null);

  const circleColors = [
    "#FFFFFF", "#FFF600", "#FFBB00",
    "#00A806", "#0095FF", "#FF0000",
    "#9900FF", "#888888"
  ];

  const centerNames = [
    ["더 클라임", "클라이밍 파크"],
    ["손상원 클라이밍", "서울숲 클라이밍"],
    ["알레 클라이밍", ""]
  ];

  const centerBranchCards = {
      "더 클라임": [
        {
              img: "/imgs/center/TheClimbCardImg.png",
              name: "더클라임 B 홍대점",
              address: "서울 마포구 양화로6길 36-5",
              operatingHours: "평일 13:00 ~ 22:30 / 주말 10:00 ~ 20:00",
              contact: "02-322-3034",
              facilities: ["주차", "샤워실", "Wi-Fi"],
              pricing: "입장권 19,000원 / 월회원 160,000원",
              mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.015762151941!2d126.91772477632274!3d37.55469242480646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98db726fb4bb%3A0xd0b1cd13d06553f6!2z642U7YG065287J6EIEIg7ZmN64yA7KCQIFRIRUNMSU1CIEIgSE9OR0RBRSwgU0VPVUw!5e0!3m2!1sko!2skr!4v1750092671410!5m2!1sko!2skr"
            },
            {
              img: "/imgs/center/TheClimbCardImg2.png",
              name: "더클라임 강남점",
              address: "서울 강남구 역삼로 114",
              operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
              contact: "02-123-4567",
              facilities: ["주차", "Wi-Fi"],
              pricing: "입장권 20,000원 / 월회원 150,000원",
              mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4408223198857!2d127.02940367632067!3d37.49751992808184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca178a450a37b%3A0x3a616b028856a83e!2z642U7YG065287J6EIOqwleuCqOygkCBUaGVjbGltYiBHYW5nbmFtLCBTZW91bA!5e0!3m2!1sko!2skr!4v1750092170945!5m2!1sko!2skr"
            },
            {
                img: "/imgs/center/TheClimbCardImg3.png",
                name: "더클라임 일산점",
                address: "경기 고양시 일산동구 중앙로 1160 5층",
                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                contact: "02-565-4747",
                facilities: ["주차", "Wi-Fi"],
                pricing: "입장권 20,000원 / 월회원 150,000원",
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.9353890351545!2d126.77631037632615!3d37.65072301929539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c854f618e8d13%3A0xa66d743036da3cb0!2z642U7YG065287J6EIOydvOyCsOygkC1USEVDTElNQiBJTFNBTg!5e0!3m2!1sko!2skr!4v1750093172308!5m2!1sko!2skr"
                        },
            {
                            img: "/imgs/center/TheClimbCardImg4.png",
                            name: "더클라임 양재점",
                            address: "서울특별시 강남구 도곡1동 남부순환로 2615 지하1층",
                            operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                            contact: "02-565-4747",
                            facilities: ["주차", "Wi-Fi"],
                            pricing: "입장권 20,000원 / 월회원 150,000원",
                            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.965401252684!2d127.03328337632055!3d37.4851428287904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1b92aabce99%3A0x732e8c4a9c11d3e6!2z642U7YG065287J6EIOyWkeyerOygkA!5e0!3m2!1sko!2skr!4v1750093823453!5m2!1sko!2skr"
                                    },
            {
                                        img: "/imgs/center/TheClimbCardImg5.png",
                                        name: "더클라임 마곡점",
                                        address: "서울특별시 강서구 796-3 마곡사이언스타워 7층",
                                        operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                        contact: "02-565-4747",
                                        facilities: ["주차", "Wi-Fi"],
                                        pricing: "입장권 20,000원 / 월회원 150,000원",
                                        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.7614877309243!2d126.83119337632311!3d37.560682824463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9c65ae1ffb09%3A0xfe0089386ed615ce!2z642U7YG065287J6EIOuniOqzoeygkA!5e0!3m2!1sko!2skr!4v1750094055192!5m2!1sko!2skr"
                                                },
      ],
      "클라이밍 파크": [
        {
                      img: "/imgs/center/ClimbingPark.png",
                      name: "클라이밍파크 종로점",
                      address: "서울특별시 종로구 종로 199 지하2층 한일빌딩",
                      operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                      contact: "02-123-4567",
                      facilities: ["주차", "Wi-Fi"],
                      pricing: "입장권 20,000원 / 월회원 150,000원",
                      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.30578805259!2d126.99723407632344!3d37.571416523847596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3dfc157409d%3A0x33f34741cebabc3f!2z7YG065287J2067CN7YyM7YGsIOyiheuhnOygkA!5e0!3m2!1sko!2skr!4v1750094697794!5m2!1sko!2skr"
                    },
        {
                      img: "/imgs/center/ClimbingPark2.png",
                      name: "클라이밍파크 신논현점",
                      address: "서울특별시 강남구 역삼동 강남대로 468 지하 3층",
                      operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                      contact: "02-123-4567",
                      facilities: ["주차", "Wi-Fi"],
                      pricing: "입장권 20,000원 / 월회원 150,000원",
                      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4408223198857!2d127.02940367632067!3d37.49751992808184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca178a450a37b%3A0x3a616b028856a83e!2z642U7YG065287J6EIOqwleuCqOygkCBUaGVjbGltYiBHYW5nbmFtLCBTZW91bA!5e0!3m2!1sko!2skr!4v1750092170945!5m2!1sko!2skr"
                    },
        {
                      img: "/imgs/center/ClimbingPark3.png",
                      name: "클라이밍파크 성수점",
                      address: "서울특별시 성동구 연무장13길 7",
                      operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                      contact: "02-123-4567",
                      facilities: ["주차", "Wi-Fi"],
                      pricing: "입장권 20,000원 / 월회원 150,000원",
                      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.541299019858!2d127.05550917632233!3d37.5423088255163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca5ac2d453a29%3A0x869e82a9d9707355!2z7YG065287J2067CN7YyM7YGsIOyEseyImOygkA!5e0!3m2!1sko!2skr!4v1750094772913!5m2!1sko!2skr"
                    },
        {
                      img: "/imgs/center/ClimbingPark4.png",
                      name: "클라이밍파크 강남점",
                      address: "서울특별시 강남구 강남대로 364",
                      operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                      contact: "02-123-4567",
                      facilities: ["주차", "Wi-Fi"],
                      pricing: "입장권 20,000원 / 월회원 150,000원",
                      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5242165568775!2d127.02676627632076!3d37.49555252819463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca10028422709%3A0x443ae10dafcd3a12!2z7YG065287J2067CN7YyM7YGsIOqwleuCqOygkA!5e0!3m2!1sko!2skr!4v1750094842908!5m2!1sko!2skr"
                    },
        {
                      img: "/imgs/center/ClimbingPark5.png",
                      name: "클라이밍파크 한티점",
                      address: "서울특별시 강남구 대치4동 선릉로 324",
                      operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                      contact: "02-123-4567",
                      facilities: ["주차", "Wi-Fi"],
                      pricing: "입장권 20,000원 / 월회원 150,000원",
                      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.398738053276!2d127.04945637632076!3d37.498512728025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca5dec1f202d5%3A0x4912ef8c97f1c83b!2z7YG065287J2067CN7YyM7YGsIO2VnO2LsOygkA!5e0!3m2!1sko!2skr!4v1750094893538!5m2!1sko!2skr"
                    },
      ],
      "손상원 클라이밍": [
        {
                              img: "/imgs/center/SonClimbing.png",
                              name: "손상원 클라이밍 강남점",
                              address: "서울특별시 서초구 강남대로 331",
                              operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                              contact: "02-123-4567",
                              facilities: ["주차", "Wi-Fi"],
                              pricing: "입장권 20,000원 / 월회원 150,000원",
                              mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.649986353548!2d127.02470258866734!3d37.49258525633009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca176c6001d55%3A0x6a6b7173dd3c401c!2z7IaQ7IOB7JuQIO2BtOudvOydtOuwjeynkCDqsJXrgqjsl63soJA!5e0!3m2!1sko!2skr!4v1750095343236!5m2!1sko!2skr"
                            },
        {
                              img: "/imgs/center/SonClimbing2.png",
                              name: "손상원 클라이밍 판교점",
                              address: "경기도 성남시 분당구 삼평동",
                              operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                              contact: "02-123-4567",
                              facilities: ["주차", "Wi-Fi"],
                              pricing: "입장권 20,000원 / 월회원 150,000원",
                              mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.4819539274467!2d127.1044237763174!3d37.40208183354053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca79419ffd731%3A0x429293436f41e791!2z7IaQ7IOB7JuQ7YG065287J2067CN7KeQIO2MkOq1kOygkA!5e0!3m2!1sko!2skr!4v1750095309338!5m2!1sko!2skr"
                            },
        {
                              img: "/imgs/center/SonClimbing3.png",
                              name: "손상원 클라이밍 을지로점",
                              address: "서울특별시 강남구 대치4동 선릉로 324",
                              operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                              contact: "02-123-4567",
                              facilities: ["주차", "Wi-Fi"],
                              pricing: "입장권 20,000원 / 월회원 150,000원",
                              mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.4346885695686!2d126.9797516763233!3d37.5683806240215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca300758122c3%3A0xb3e8edeb5a692e7b!2z7IaQ7IOB7JuQIO2BtOudvOydtOuwjeynkCDsnYTsp4DroZzsoJA!5e0!3m2!1sko!2skr!4v1750095392901!5m2!1sko!2skr"
                            },
      ],
      "서울숲 클라이밍": [
          {
                                img: "/imgs/center/SeoulForest.png",
                                name: "서울숲 클라이밍 본점",
                                address: "성수동1가 656-1093번지 지하2층, 성수동1가 성동구 서울특별시",
                                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                contact: "02-123-4567",
                                facilities: ["주차", "Wi-Fi"],
                                pricing: "입장권 20,000원 / 월회원 150,000원",
                                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5378747408577!2d127.04611327632237!3d37.542389525511695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca582b23d9b21%3A0x97029a245cf7def0!2z7ISc7Jq47IiyIO2BtOudvOydtOuwjQ!5e0!3m2!1sko!2skr!4v1750096008584!5m2!1sko!2skr"
                              },
          {
                                img: "/imgs/center/SeoulForest2.png",
                                name: "서울숲 클라이밍 종로점",
                                address: "서울특별시 종로구 수표로 96",
                                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                contact: "02-123-4567",
                                facilities: ["주차", "Wi-Fi"],
                                pricing: "입장권 20,000원 / 월회원 150,000원",
                                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.376652803984!2d126.9874035763234!3d37.569747523943356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3000ce3c853%3A0x1ccbcf27b6dff0a9!2z7ISc7Jq47Iiy7YG065287J2067CNIOyiheuhnOygkA!5e0!3m2!1sko!2skr!4v1750095877654!5m2!1sko!2skr"
                              },
          {
                                img: "/imgs/center/SeoulForest3.png",
                                name: "서울숲 클라이밍 잠실점",
                                address: "서울특별시 송파구 백제고분로7길 49",
                                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                contact: "02-123-4567",
                                facilities: ["주차", "Wi-Fi"],
                                pricing: "입장권 20,000원 / 월회원 150,000원",
                                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8762086939582!2d127.08182557632134!3d37.51083772731926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca5bfe288dd67%3A0x258788570c1235b8!2z7ISc7Jq47Iiy7YG065287J2067CNIOyeoOyLpOygkA!5e0!3m2!1sko!2skr!4v1750096093402!5m2!1sko!2skr"
                              },
          {
                                img: "/imgs/center/SeoulForest4.png",
                                name: "서울숲 클라이밍 구로점",
                                address: "서울특별시 구로구 디지털로 300 지하 1층",
                                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                contact: "02-123-4567",
                                facilities: ["주차", "Wi-Fi"],
                                pricing: "입장권 20,000원 / 월회원 150,000원",
                                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.975753938821!2d126.89396517632038!3d37.48489852880444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f8c171581cd%3A0x75213f75f51e2cf4!2z7ISc7Jq47Iiy7YG065287J2067CNIOq1rOuhnOygkA!5e0!3m2!1sko!2skr!4v1750096173329!5m2!1sko!2skr"
                              },
          {
                                img: "/imgs/center/SeoulForest5.png",
                                name: "서울숲 클라이밍 영등포점",
                                address: "서울특별시 영등포구 문래동3가 55-16",
                                operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                contact: "02-123-4567",
                                facilities: ["주차", "Wi-Fi"],
                                pricing: "입장권 20,000원 / 월회원 150,000원",
                                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.599647678493!2d126.89702717632142!3d37.51735962694567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9fbda7bb4a73%3A0xa29c4ecde725d7ab!2z7ISc7Jq47Iiy7YG065287J2067CNIOyYgeuTse2PrOygkA!5e0!3m2!1sko!2skr!4v1750096249582!5m2!1sko!2skr"
                              },
      ],
      "알레 클라이밍": [
        {
                                        img: "/imgs/center/AleClimb.png",
                                        name: "알레 클라이밍 본점",
                                        address: "서울특별시 영등포구 스위트빌 B01호",
                                        operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                        contact: "02-123-4567",
                                        facilities: ["주차", "Wi-Fi"],
                                        pricing: "입장권 20,000원 / 월회원 150,000원",
                                        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5378747408577!2d127.04611327632237!3d37.542389525511695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca582b23d9b21%3A0x97029a245cf7def0!2z7ISc7Jq47IiyIO2BtOudvOydtOuwjQ!5e0!3m2!1sko!2skr!4v1750096008584!5m2!1sko!2skr"
                                      },
        {
                                        img: "/imgs/center/AleClimb2.png",
                                        name: "알레 클라이밍 강동점",
                                        address: "서울특별시 강동구 천호대로177길 39 거산유팰리스 2차 지 2층",
                                        operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                        contact: "02-123-4567",
                                        facilities: ["주차", "Wi-Fi"],
                                        pricing: "입장권 20,000원 / 월회원 150,000원",
                                        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.7953219459005!2d127.1329526886785!3d37.536321853795535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb1f76da246c5%3A0x74af5a19e21abe0f!2z7JWM66CI7YG065287J2067CNIOqwleuPmeygkChBbGxleiBfQ0xJTUJfZ2FuZ2Rvbmcp!5e0!3m2!1sko!2skr!4v1750096535059!5m2!1sko!2skr"
                                      },
        {
                                        img: "/imgs/center/AleClimb3.png",
                                        name: "알레 클라이밍 혜화점",
                                        address: "KR 서울특별시 종로구 창경궁로34길18-5 토가빌딩 동숭갤러리 B2층",
                                        operatingHours: "평일 12:00 ~ 22:00 / 주말 10:00 ~ 20:00",
                                        contact: "02-123-4567",
                                        facilities: ["주차", "Wi-Fi"],
                                        pricing: "입장권 20,000원 / 월회원 150,000원",
                                        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3161.7676634082013!2d126.99817517632377!3d37.5840883231206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3451d2dc293%3A0xa4f55709d7cc96d1!2z7JWM66CI7YG065287J2067CNIO2YnO2ZlOygkA!5e0!3m2!1sko!2skr!4v1750096590005!5m2!1sko!2skr"
                                      },
      ]
    };

  const handleAddToFavorites = () => {
    if (!selectedBranch) return;

    const savedItems = JSON.parse(localStorage.getItem("wishItems")) || [];

    // 중복 방지: 동일한 id(name으로 판단) 있으면 추가 안 함
    const isDuplicate = savedItems.some((item) => item.id === selectedBranch.name);
    if (isDuplicate) {
      alert("이미 즐겨찾기에 추가된 지점입니다.");
      return;
    }

    const newItem = {
      id: selectedBranch.name, // 이름을 ID처럼 사용
      img: selectedBranch.img,
      title: selectedBranch.name,
      price: selectedBranch.pricing,
    };

    const updatedItems = [...savedItems, newItem];
    localStorage.setItem("wishItems", JSON.stringify(updatedItems));
    alert("즐겨찾기에 추가되었습니다!");
  };


  const icons = [
    {
      id: 1,
      src: "/icons/centerStar.svg",
      alt: "즐겨찾기",
      onClick: () => {
            handleAddToFavorites();
          },
    },
    { id: 2, src: "/icons/Share.svg", alt: "공유" },
    { id: 3, src: "/icons/Bmark.svg", alt: "북마크" },
    { id: 4, src: "/icons/Insta.svg", alt: "인스타그램" }
  ];

  const handleIconClick = (icon) => {
    setIconSelectedId(icon.id);
    icon.onClick?.();
  };

  const handleCenterClick = (name) => {
    setCenterSelected(name);
  };

  const centerMainImages = {
    "더 클라임": "/imgs/center/TheClimbMainURL.png",
    "클라이밍 파크": "/imgs/center/ClimbingParkMain.png",
    "손상원 클라이밍": "/imgs/center/SonClimbMain.png",
    "서울숲 클라이밍": "/imgs/center/SeoulForestClimbMain.png",
    "알레 클라이밍": "/imgs/center/AleClimbMain.png"
  };

  const [selectedBranch, setSelectedBranch] = useState(centerBranchCards["더 클라임"][0]); // 초기 선택


  const centerComponents = {
    [centerSelected]: (
      <div className="center-content">
        {/* 고정 상단 이미지 */}
              <img
                src={centerMainImages[centerSelected] || "/imgs/center/default.png"}
                alt="centerMainimg"
                className="center-body-img"
              />

        {/* 마크, 난이도 영역 */}
        <div className="center-markBox">
          <div className="center-btnBox">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className={`centericon-box ${iconSelectedId === icon.id ? "selected" : ""}`}
                onClick={() => handleIconClick(icon)}
              >
                <img src={icon.src} alt={icon.alt} />
              </div>
            ))}
          </div>

          <div className="center-levelBox">
            <div className="center-level">
              <h1>난이도</h1>
              <div className="center-levelLine" />
              <div className="center-circleContainer">
                {circleColors.map((color, index) => (
                  <div
                    key={`circle-${index}`}
                    className="center-circle"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="center-levelBar">
              <img
                src="/icons/centerFire.svg"
                alt="불 아이콘"
                className="center-levelBar-icon"
              />
              <div className="center-bar">
                <div className="center-arrow" />
              </div>
              <img
                src="/icons/centerFire.svg"
                alt="불 아이콘"
                className="center-largeIcon"
                style={{ marginLeft: "16px" }}
              />
            </div>

            {selectedBranch && (
              <div className="branch-detail-section" style={{ display: "flex", gap: "40px" }}>
                {/* 왼쪽 텍스트 정보 */}
                <div className="branch-info-text" style={{ flex: 1 }}>
                  <h2>오시는 길</h2>
                  <p>{selectedBranch.address}</p>

                  <h2>운영시간</h2>
                  <p>{selectedBranch.operatingHours}</p>

                  <h2>연락처</h2>
                  <p>{selectedBranch.contact}</p>

                  <h2>편의시설</h2>
                  <p>{selectedBranch.facilities.join(" • ")}</p>

                  <h2>이용가격</h2>
                  <p>{selectedBranch.pricing}</p>
                </div>

                {/* 오른쪽 지도 */}
                <div className="branch-map" style={{ flex: 1 }}>
                  <h2>지도</h2>
                  <iframe
                    src={selectedBranch.mapEmbed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}


          </div>
        </div>

        {/* 지점 카드 목록 */}
              <div className="center-infoBox scrollable-info">
                <div className="center-infoCardBox">
                  {centerBranchCards[centerSelected]?.length > 0 ? (
                    centerBranchCards[centerSelected].map((card, index) => (
                      <CenterInfoCard
                        key={index}
                        imgSrc={card.img}
                        branchName={card.name}
                        onClick={() => setSelectedBranch(card)}
                      />

                    ))
                  ) : (
                    <p>등록된 지점 정보가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          ),
        };

  return (
    <div className="container">
      <div className="center-container">
        <div className="center-header">
          <img
            src="/imgs/CenterHeader.png"
            alt="센터 헤더 이미지"
            className="center-header-img"
          />
          <div className="centername-container">
            {centerNames.map((row, rowIndex) => (
              <div className="centername-row" key={`row-${rowIndex}`}>
                {row.map((name) =>
                  name && (
                    <span
                      key={name}
                      onClick={() => handleCenterClick(name)}
                      className={`centername ${centerSelected === name ? "selected" : ""}`}
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="center-line" />

        <div className="center-body">
          {centerComponents[centerSelected] || <div>해당 센터 정보가 없습니다.</div>}
        </div>
      </div>
    </div>
  );
};

export default Center;
