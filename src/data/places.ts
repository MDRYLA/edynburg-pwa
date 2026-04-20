import type { Place } from "@/types";

/**
 * UWAGA: `sections[]` dla każdej atrakcji są PUSTE.
 * Wypełnij je ręcznie po wykonaniu Deep Research wg `10-research-prompts.md`.
 * Puste sections są OK — aplikacja pokazuje wtedy placeholder z instrukcją.
 */
export const places: Record<string, Place> = {
  "edinburgh-castle": {
    slug: "edinburgh-castle",
    name: "Zamek Edynburski",
    nameEn: "Edinburgh Castle",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ98CZIJrHh0gRWApM5esemkY",
    coordinates: { lat: 55.9485947, lng: -3.1999135 },
    openingHours: "9:30 – 18:00",
    price: "£21.50 (dorosły)",
    duration: "2h zwiedzania",
    website: "https://www.edinburghcastle.scot/",
    illustration: "/svg/illustrations/castle.svg",
    sections: [
      {
        title: "Noc z 14 marca 1314 — trzydziestu ludzi na skale",
        content: "Gdy w 1314 roku zamek od osiemnastu lat trzymał angielski garnizon, Robert Bruce wysłał swojego siostrzeńca, Thomasa Randolpha, hrabiego Moray, by odbić twierdzę. Plan był szaleńczy — wspiąć się nocą po niemal pionowej, wulkanicznej skale od północnej strony. Pomógł przypadek: William Francis, jeden z ludzi Randolpha, znał ścieżkę, którą w młodości wymykał się z zamku do ukochanej w mieście. Wystarczyła drabina długości dwunastu stóp. Trzydziestu żołnierzy w ciemnościach pokonało urwisko, przeskoczyło mur i zaskoczyło załogę. Tej samej nocy Randolph zdobył zamek — a Bruce wydał rozkaz, który mówi wszystko o ówczesnych realiach: zburzyć wszystko oprócz kaplicy św. Małgorzaty, żeby Anglicy nie mieli dokąd wrócić. To dlatego dzisiejszy zamek to właściwie późniejsza rekonstrukcja wokół jednego średniowiecznego fragmentu.",
      },
      {
        title: "Pokój mniejszy niż twoja łazienka — narodziny króla dwóch królestw",
        content: "19 czerwca 1566 roku Maria Stuart urodziła w Royal Palace syna — przyszłego Jakuba VI Szkocji i Jakuba I Anglii, pierwszego monarchę łączącego oba królestwa. Komnata porodowa jest tak mała, że trudno uwierzyć, że to tu rozegrała się jedna z najważniejszych scen brytyjskiej dynastii. Maria nie wybrała jej przez przypadek. Trzy miesiące wcześniej, w Holyrood, na jej oczach zamordowano jej sekretarza Davida Rizzia — 56 ciosów sztyletem, podobno w obecności ciężarnej królowej. Przerażona porzuciła wygodę pałacu na dole i zamknęła się w najbardziej obronnym miejscu Szkocji. Dziś na ścianach komnaty wiszą monogramy „MR\" i „JR\", a malowidło z 1617 roku upamiętnia narodziny. To tutaj, w klitce wielkości szafy, zaczęła się historia, która po 37 latach połączyła Londyn z Edynburgiem.",
      },
      {
        title: "Klejnoty Koronne, które dwa razy zniknęły",
        content: "W 1651 roku, gdy Cromwell zbliżał się do zamku Dunnottar, Honours of Scotland — korona, berło i miecz państwowy — były w śmiertelnym niebezpieczeństwie. Anglicy zniszczyli już angielskie regalia i na szkockie mieli ten sam plan. Ratunek przyszedł od dwóch kobiet: Elizabeth Douglas i Christian Fletcher, żony pastora z Kinneff. Według jednej wersji Fletcher przemyciła klejnoty w workach z prowiantem; według innej opuszczono je na plażę w koszu z wodorostami. Przez osiem lat leżały ukryte pod posadzką małego kościoła w Kinneff, wykopywane co trzy miesiące i suszone przy ogniu. Po restauracji Karola II wróciły na zamek — i po koronacji w 1707 roku zamknięto je w skrzyni w Crown Room. Zapomniano o nich tak dokładnie, że przez ponad sto lat krążyły plotki, że wywieziono je do Londynu. Dopiero 4 lutego 1818 roku Walter Scott, z królewskim nakazem, kazał rozbić zamurowane drzwi. W kurzu leżały nienaruszone.",
      },
      {
        title: "Mons Meg, One O'Clock Gun i kamień, którego już tu nie ma",
        content: "W 1457 roku Filip Dobry, książę Burgundii, podarował Jakubowi II potworne działo — Mons Meg, bombardę zdolną strzelać kamiennymi kulami o wadze 150 kilogramów. 14 października 1681 roku, podczas powitania księcia Yorku, angielski puszkarz przesadził z prochem i lufa pękła. Od tamtej pory Meg już nigdy nie wystrzeliła, ale wciąż stoi przy kaplicy św. Małgorzaty. Inna tradycja jest młodsza: od 7 czerwca 1861 roku codziennie punktualnie o 13:00 (oprócz niedziel) na Half Moon Battery rozlega się wystrzał. Był zsynchronizowany z kulą czasu na Nelson Monument na Calton Hill — gdy mgła zasłaniała kulę, statki w porcie Leith nastawiały chronometry po huku. Jedna rzecz zmieniła się niedawno: Kamień Przeznaczenia, na którym koronowano szkockich królów, opuścił zamek 10 marca 2024 roku i jest teraz w Perth Museum.",
      },
    ],
    tips: [
      "Przyjdźcie 5 minut PO swoim slocie (14:30) — pierwsza fala już wejdzie",
      "Audioprzewodnik (~£4) jest wart ceny, szczególnie przy Honours of Scotland",
      "Najlepsze panoramy z Argyle Battery (wschodnia strona)",
      "Kamień Przeznaczenia został przeniesiony do Perth Museum w 2024 — nie ma go już w zamku",
      "Crown Room może być zamknięty (remont do kwietnia 2026) — sprawdźcie na stronie",
      "One O'Clock Gun strzela o 13:00 (wy będziecie jeszcze w katedrze)",
    ],
  },

  "calton-hill": {
    slug: "calton-hill",
    name: "Calton Hill",
    nameEn: "Calton Hill",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJmcdGbonHh0gR3WZX92S2gZE",
    coordinates: { lat: 55.9550465, lng: -3.1827409 },
    openingHours: "Otwarte 24/7",
    price: "Bezpłatne",
    duration: "60 min",
    illustration: "/svg/illustrations/calton-hill.svg",
    sections: [
      {
        title: "Dlaczego Edynburg chciał być Atenami",
        content: "Na przełomie XVIII i XIX wieku Edynburg przeżywał intelektualny szczyt, jakiego nie miało wiele stolic Europy — David Hume, Adam Smith, James Hutton, Dugald Stewart, Walter Scott. Miasto nazwano „Atenami Północy\", a porównanie nie było tylko pochlebstwem. Elita uznała, że skoro Edynburg rywalizuje z Atenami duchem, powinien rywalizować też kamieniem. Calton Hill — wulkaniczne wzgórze tuż obok New Town — miało zostać szkockim Akropolem. Powstały na nim świątynie w stylu greckim, obserwatorium wzorowane na Wieży Wiatrów, pomniki z kolumnadami. W 1995 roku całość włączono w obszar World Heritage UNESCO „Old and New Towns of Edinburgh\". Dziś to najbardziej fotografowana panorama miasta: z jednej strony Stare Miasto z zamkiem, z drugiej Firth of Forth, a na pierwszym planie — kolumny, które miały być większe, niż są.",
      },
      {
        title: "Edinburgh's Disgrace — niedokończony Partenon",
        content: "Pomysł był szalenie ambitny: zbudować wierną kopię ateńskiego Partenonu jako narodowy pomnik szkockich żołnierzy poległych w wojnach napoleońskich. W styczniu 1822 roku ogłoszono zbiórkę 42 000 funtów, architekci Charles Cockerell i William Playfair zaprojektowali gmach, kamień węgielny położono z wielką pompą. Budowa ruszyła w 1826 roku. Trzy lata później — stop. Udało się zebrać mniej niż połowę sumy, postawiono 12 kolumn z fasady zachodniej, i na tym się skończyło. Kilka prób dokończenia odrzucono; niektórzy uznali nawet, że ruina w stylu greckim jest bardziej romantyczna niż gotowa świątynia. Edynburczycy szybko ukuli nazwy: „Scotland's Folly\", „Scotland's Pride and Poverty\", a najczęściej — „Edinburgh's Disgrace\". Te dwanaście kolumn stoi tak od prawie dwustu lat i jest jednym z najdziwniejszych zabytków Europy: pomnikiem, który nie został ukończony, ale nie został też uznany za porażkę.",
      },
      {
        title: "Odwrócony teleskop i kula, która spada codziennie",
        content: "Nelson Monument postawiono między 1807 a 1815 rokiem dla upamiętnienia admirała Nelsona i zwycięstwa pod Trafalgarem z 1805 roku. Projekt Roberta Burna przypomina odwrócony teleskop marynarski — i to nie przypadek, tylko aluzja do zawodu bohatera. Prawdziwa użyteczność pomnika zaczęła się w 1853 roku. Wtedy Charles Piazzi Smyth, drugi Astronomer Royal for Scotland, zainstalował na szczycie kulę czasu — drewnianą, obitą cynkiem, ważącą 90 kilogramów. Codziennie punktualnie o 13:00 kula opadała w dół masztu, a marynarze na statkach w porcie Leith i Firth of Forth nastawiali według niej chronometry. Precyzja była kwestią życia — błąd sekund oznaczał błąd mil nawigacji. Kula spada do dziś, zsynchronizowana z armatą w zamku. Gdy stoisz na Calton Hill o 13:00, zobaczysz jedno i drugie: opadającą kulę i dym nad Half Moon Battery.",
      },
      {
        title: "Świątynia filozofa i dziewięć kolumn z Aten",
        content: "Gdy w 1828 roku zmarł Dugald Stewart — profesor filozofii moralnej Uniwersytetu Edynburskiego i jeden z najważniejszych myślicieli szkockiego Oświecenia — Royal Society of Edinburgh postanowiło uczcić go pomnikiem. W 1830 roku wybrano miejsce, a projekt powierzono Williamowi Playfairowi. Powstała kopia Pomnika Lizykratesa z Aten z IV wieku p.n.e. — okrągła świątynia na podwyższeniu, dziewięć kanelowanych korynckich kolumn, pośrodku urna. Playfair zbudował ją w 1831 roku na samym zachodnim skraju wzgórza, dokładnie tam, gdzie prowadzi wzrok każdy, kto wchodzi na Calton Hill od strony New Town. Efekt był tak dobry, że dziś to prawdopodobnie najczęściej fotografowane miejsce w Edynburgu — bo ustawiając się za kolumnami, masz w kadrze całe Stare Miasto z zamkiem i iglicą Scott Monument. Ironicznie: pomnik filozofa, którego prawie nikt nie czyta, stał się ikoną miasta.",
      },
    ],
    tips: [
      "Łatwe wejście — 10 min pod górkę",
      "Najlepsze widoki: wschód (morze i Leith), południowy zachód (centrum i zamek)",
      "Nelson Monument wejście kosztuje £6 — widok ze wzgórza już jest świetny, można odpuścić",
      "Beltane Fire Festival odbywa się tu 30 kwietnia (celtyckie święto)",
      "W kwietniu może być chłodno i wietrznie — zabierzcie cieplejszą kurtkę",
    ],
  },

  "scott-monument": {
    slug: "scott-monument",
    name: "Scott Monument",
    nameEn: "Scott Monument",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ3VSVwI7Hh0gRIxcCPRiThek",
    coordinates: { lat: 55.952381, lng: -3.1932741 },
    openingHours: "10:00–12:30, 13:45–15:30 (wewnątrz)",
    price: "Bezpłatne z zewnątrz",
    duration: "20 min",
    website: "https://www.edinburghmuseums.org.uk/venue/scott-monument/",
    illustration: "/svg/illustrations/scott-monument.svg",
    sections: [
      {
        title: "Cieśla, który pokonał architektów",
        content: "W 1836 roku Edynburg ogłosił konkurs na pomnik Waltera Scotta. Wpłynęły 54 projekty — od uznanych architektów, z pracowniami, listami referencyjnymi i grecko-rzymskimi kolumnadami. Zwyciężył projekt podpisany „John Morvo\", nazwiskiem średniowiecznego budowniczego opactwa Melrose. Gdy komisja otworzyła kopertę, okazało się, że autorem jest George Meikle Kemp — 45-letni cieśla, syn pasterza z pogranicza, który architektury nauczył się sam, szkicując gotyckie kościoły, w których pracował. Jego projekt — 61-metrowa gotycka iglica, coś pomiędzy katedrą a rakietą — wygrał, bo był najbardziej ambitny. Kemp nie dożył końca pracy. 6 marca 1844 roku, wracając wieczorem z narady z budowniczym, utonął w Union Canal. Okoliczności nigdy nie zostały wyjaśnione — podejrzewano mgłę, napad, potknięcie. Ciało znaleziono po pięciu dniach. Monument dokończył jego szwagier, a kamień wieńczący położył dziesięcioletni syn Kempa, Thomas.",
      },
      {
        title: "61 metrów, 287 schodów, 64 rzeźby",
        content: "Scott Monument ma 61 metrów wysokości i do dziś jest największym pomnikiem pisarza na świecie. 287 wąskich, spiralnych schodów prowadzi na cztery poziomy tarasów; między drugim a trzecim przesmyk jest tak ciasny, że trzeba się obrócić bokiem. Na fasadzie umieszczono 64 rzeźby — wszystkie przedstawiają postaci z powieści Scotta (Ivanhoe, Rob Roy, Waverley) albo realnych ludzi z jego życia. U podstawy, pod centralnym łukiem, siedzi sam Scott — marmurowa rzeźba Johna Steella w podwójnej skali naturalnej, z książką w dłoni i psem Maidą u stóp. Maida to nie ozdoba: ulubiony deerhound Scotta był jego stałym towarzyszem na spacerach po Abbotsford. Pomnik postawiono na Princes Street, na głównej osi New Town — i to pierwsza rzecz, którą widzisz, wychodząc ze stacji Waverley. Stacja też nosi jego imię — od jego pierwszej powieści.",
      },
      {
        title: "Czarny nie jest naturalny — i inna zasługa Scotta",
        content: "Scott Monument jest czarny, ale kamień, z którego go zbudowano, pierwotnie miał kolor bladego miodu. To piaskowiec z Binny w West Lothian, tyle że zawierający naturalne ślady ropy łupkowej. W XIX-wiecznym Edynburgu, znanym jako „Auld Reekie\" — „Stara Śmierdząca\" — powietrze było gęste od dymu z węgla palonego w dziesiątkach tysięcy kominów. Olejki w kamieniu działały jak klej: chwytały sadzę, która wsiąkała na zawsze. Czyszczenie pomnika jest niemal niemożliwe bez uszkodzenia rzeźb. Poza kolorem, Scott zostawił Szkocji coś jeszcze większego — mit narodowy. To on w sierpniu 1822 roku, jako reżyser wizyty Jerzego IV w Edynburgu, pierwszej od 170 lat wizyty monarchy w Szkocji, zamówił za równowartość dzisiejszych 120 tysięcy funtów tartanów i ubrał króla w kilt. W dwa tygodnie ubiór górali, dotąd traktowany jako strój „dzikusów\", stał się symbolem narodowym. Kilty, tartany klanowe, romantyczna Szkocja, którą dziś sprzedaje się turystom — to w ogromnej mierze wymysł Scotta, „Czarodzieja Północy\".",
      },
    ],
    tips: [
      "Najlepszy kąt z Waverley Bridge (od strony wschodniej)",
      "Pomnik ma 61 metrów wysokości — największy pomnik pisarza na świecie",
      "Ciemny kolor kamienia to sadza z kominów XIX-wiecznego Edynburga, nie naturalny",
      "Wy nie wchodzicie do środka — tylko oglądacie (287 schodów, £10)",
      "Na cokole 68 rzeźb postaci z powieści Waltera Scotta",
    ],
  },

  "st-giles-cathedral": {
    slug: "st-giles-cathedral",
    name: "Katedra św. Idziego",
    nameEn: "St Giles' Cathedral",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ_QP3T4XHh0gR8i8eVxbnJKo",
    coordinates: { lat: 55.9494837, lng: -3.1908918 },
    openingHours: "Pn-Pt 10:00–18:00, Sob 9:00–17:00, Nd 13:00–17:00",
    price: "Bezpłatne (sugerowana dotacja £10)",
    duration: "40 min",
    website: "https://stgilescathedral.org.uk/",
    illustration: "/svg/illustrations/st-giles.svg",
    sections: [
      {
        title: "Od Dawida I do Johna Knoksa",
        content: "Kościół św. Idziego stoi tu od około 1124 roku, założony prawdopodobnie przez króla Dawida I jako parafia Edynburga — wtedy małego osiedla pod zamkiem. W 1385 armia Ryszarda II splądrowała miasto i spaliła dach; kamienne filary przetrwały, a XV wiek przyniósł rekonstrukcję w gotyku oraz koronną iglicę, która do dziś wieńczy dach. Prawdziwy przełom przyszedł w 1559 — reformator John Knox wrócił z Genewy i w tym kościele zaczął nawracać Szkocję na protestantyzm. Jego kazania brzmiały jak eksplozje: w parę miesięcy szlachta przyjęła Reformację, zakazano mszy katolickiej, a Maria Stuart została w 1567 zmuszona do abdykacji. Dosłownie z tej nawy Knox przeprojektował religię, politykę i edukację kraju na dwa stulecia naprzód.",
      },
      {
        title: "Dziewczyna, która rzuciła stołkiem",
        content: "Niedziela, 23 lipca 1637. Karol I chce narzucić Szkotom anglikańską liturgię — w tę poranną mszę dziekan James Hannay otwiera nowy, „papistowski\" modlitewnik. Wtedy Jenny Geddes, uliczna przekupka, podrywa się ze swojego stołka i rzuca nim prosto w głowę duchownego, wrzeszcząc po szkocku: „Daur ye say Mass in my lug?\" („Śmiesz odprawiać mszę w moim uchu?\"). Kościół wybucha — latają Biblie, kije, kamienie. To iskra. W kolejnych miesiącach Szkoci podpisują National Covenant, wybuchają Wojny Biskupie, które pociągają za sobą angielską wojnę domową i ścięcie Karola I w 1649. Jedna kobieta, jeden stołek, przewrót trzech królestw. W północnej nawie stoi dziś brązowy pomnik trójnożnego „cuttie-stool\" — jej broni.",
      },
      {
        title: "Kaplica Ostu i anioły z dudami",
        content: "W południowo-wschodnim rogu katedry ukryta jest Thistle Chapel, ukończona w 1911 według projektu Roberta Lorimera. To siedziba Orderu Ostu — najstarszego szkockiego orderu rycerskiego (reaktywowanego w 1687), do którego należy monarcha i szesnastu rycerzy. Wewnątrz każdy centymetr drewna jest rzeźbiony: herby, lwy, jednorożce, a na sklepieniu — małe aniołki grające na dudach, harfie i bębnie. Szukaj ich w górze, to mało znany detal. Nad głównym kościołem góruje Crown Spire, ostatnia zachowana gotycka korona w Szkocji, zbudowana około 1500 roku jako symbol korony cierniowej Chrystusa. Przed zachodnim wejściem, w bruku, zobaczysz mozaikę w kształcie serca — Heart of Midlothian. Oznacza miejsce rozebranego w 1817 więzienia Tolbooth; edynburczycy plują na nią na szczęście (i ze starej pogardy do katów).",
      },
    ],
    tips: [
      "Wstęp darmowy, ale przy wejściu sugerują £10 dotacji — dobrowolne",
      "Fotografowanie wymaga photo permit — zapytajcie przy wejściu",
      "Must-see: Thistle Chapel (szczególnie figurki aniołów grających na dudach)",
      "Heart of Midlothian — mozaika serca na bruku przed wejściem, tradycja mówi żeby na nią spluwać",
      "Kościół Szkocji rozważa wprowadzenie obowiązkowej opłaty £6 — sprawdźcie aktualną politykę",
    ],
  },

  "royal-mile": {
    slug: "royal-mile",
    name: "Royal Mile",
    nameEn: "Royal Mile",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJieMV9YXHh0gRHsuS82zRSjY",
    coordinates: { lat: 55.9501093, lng: -3.188021 },
    openingHours: "24/7 (ulica)",
    price: "Bezpłatne",
    duration: "30+ min (spacer)",
    illustration: "/svg/illustrations/royal-mile.svg",
    sections: [
      {
        title: "Od Zamku do Pałacu — jedna linia władzy",
        content: "Royal Mile to nie jedna ulica, tylko pięć odcinków układających się w ciąg: Castlehill, Lawnmarket, High Street, Canongate i Abbey Strand. Biegnie dokładnie grzbietem wulkanicznego wzniesienia z Edinburgh Castle w dół do Pałacu Holyroodhouse — około 1,6 km w linii prostej, z różnicą wysokości prawie 70 metrów. Nazwa „Royal Mile\" jest zaskakująco młoda: pojawiła się dopiero na początku XX wieku, kiedy opisywano trasę królewskich procesji między dwiema rezydencjami. Co ważne: Canongate na dole nie był częścią Edynburga — do 1856 stanowił osobny burgh, założony przez augustianów z Holyrood Abbey („canon's gate\" = droga kanoników). Gdy schodzisz przez bramę Netherbow (dziś brązowe gwoździe w bruku koło John Knox House), przekraczasz starą granicę miasta.",
      },
      {
        title: "Pierwsze wieżowce Europy",
        content: "Od głównej ulicy odchodzi ponad 80 wąskich zaułków zwanych closes i wynds — na tyle ciasnych, że w niektórych dwoje ludzi z trudem się mija. Powód był brutalny: do XVIII wieku miasto dusiło się wewnątrz murów Flodden Wall z 1513, więc rosło w górę. Kamienice zwane „lands\" miały 10, 12, a nawet 14 pięter — były faktycznie pierwszymi wieżowcami Europy. W jednej klatce schodowej mieszkał lord, piętro niżej kupiec, a na poddaszu służąca. Najsłynniejszy close to Mary King's Close — zabudowany od góry w 1753, zachowany pod City Chambers jako podziemne muzeum (legenda mówi o zamurowanych ofiarach dżumy z 1645; historycy łagodzą, że ludzi tam leczono, nie grzebano żywcem). Zajrzyj też do Advocate's Close — stąd masz najpiękniejszy kadr na New Town po drugiej stronie doliny.",
      },
      {
        title: "Auld Reekie i krzyk „Gardyloo!\"",
        content: "Edynburg XVIII wieku miał przezwisko „Auld Reekie\" — Stara Śmierdziałka. Dziesięć pięter nad głową, brak kanalizacji i jedno rozwiązanie: o dziesiątej wieczorem mieszkańcy otwierali okna, krzyczeli „Gardyloo!\" (zniekształcone francuskie „gardez l'eau\" — uważaj na wodę) i wylewali zawartość nocników wprost na ulicę. Przechodnie, którzy nie zdążyli krzyknąć „haud yer haun!\" („trzymaj rękę!\"), wracali do domów w interesującym stanie. Do tego dym z tysięcy kominów węglowych tworzył chmurę widoczną z Fife, 30 km dalej za zatoką. Pod numerem 43-45 High Street stoi John Knox House z około 1490 roku — najstarszy zachowany dom mieszkalny Edynburga, z wystającym piętrem z muru pruskiego. Knox miał w nim mieszkać w ostatnich miesiącach życia (1572), choć historycy się kłócą.",
      },
    ],
    tips: [
      '"Mila" ma długość 1,81 km (szkocka mila była dłuższa od angielskiej)',
      "Boczne uliczki (closes) są najciekawsze — Advocate's Close ma najlepszy widok na zamek",
      "Mary King's Close — zamurowane średniowieczne miasto pod ziemią (osobna atrakcja, dziś nie wchodzicie)",
      "John Knox House — najstarszy dom mieszkalny w Edynburgu (z 1490)",
      "Wieczorem wiele pubów z muzyką na żywo, ale Wy już będziecie w drodze na lotnisko",
    ],
  },

  "victoria-street": {
    slug: "victoria-street",
    name: "Victoria Street",
    nameEn: "Victoria Street",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJPZ-4wZrHh0gRc3KN--kven0",
    coordinates: { lat: 55.9487342, lng: -3.1931981 },
    openingHours: "24/7 (ulica)",
    price: "Bezpłatne",
    duration: "30 min",
    illustration: "/svg/illustrations/victoria-street.svg",
    sections: [
      {
        title: "Ulica, której nie było",
        content: "Victoria Street to projekt inżynieryjny, nie naturalny zaułek — powstała w latach 1829-1834 jako część Edinburgh Improvement Act z 1827 roku. Przed nią stała tu stroma, błotnista uliczka West Bow, po której wozy konne nie mogły się wspiąć z Grassmarket na Royal Mile. Architekci Thomas Hamilton i William Burn zaprojektowali wielki łuk opadający łagodnie do góry, z charakterystycznym zakręceniem, żeby złagodzić nachylenie. Dostali też dwa poziomy: na dole sklepy (Victoria Street), na górze piesza terasa z widokiem (Victoria Terrace) połączona z George IV Bridge. Nazwę wybrano w 1837 na cześć młodziutkiej królowej Wiktorii — miała wtedy 18 lat. Dziś to najchętniej fotografowana ulica Szkocji, ale pamiętaj: pod stopami masz w zasadzie most, nie grunt.",
      },
      {
        title: "Jak Rowling spojrzała za okno",
        content: "J.K. Rowling pisała pierwsze tomy Harry'ego Pottera w kawiarniach Starego Miasta — najsłynniej w The Elephant House przy George IV Bridge i w Spoon (dawnym Nicolson's Cafe) kilka ulic dalej. Z obu lokali miała Victoria Street na wyciągnięcie ręki: krzywą, kolorową, pełną staroświeckich sklepów z przedziwnymi witrynami. Fani i większość przewodników uznają ją za wizualną inspirację Diagon Alley — Pokątnej, magicznej uliczki z pierwszej książki. Sama Rowling oficjalnie nie wskazała jednego miejsca, ale architektoniczne podobieństwo jest oczywiste: łuk, wielopoziomowe sklepy, kontrastowe fasady. Kilka kroków niżej, w Grassmarket, stoi pomnik Greyfriars Bobby i wejście na cmentarz Greyfriars Kirkyard, gdzie na nagrobkach wyryte są nazwiska Thomas Riddell i McGonagall. Rowling przyznała, że „pożyczyła\" je dla Voldemorta i profesor McGonagall.",
      },
      {
        title: "Pomarańcz, zieleń i powieszona Maggie",
        content: "Kolorowe fasady Victoria Street to wbrew pozorom nie dziedzictwo georgiańskie — oryginalnie kamienice były w surowym piaskowcu. Malowanie na intensywną pomarańcz, butelkową zieleń, kobaltowy błękit i czerwień zaczęło się dopiero w latach 90. XX wieku, kiedy właściciele sklepów chcieli wyróżnić witryny. Dziś to jeden z najchętniej fotografowanych kadrów Instagrama, ale prawdziwy skarb ulicy to jej kultowe biznesy: Aha Ha Ha Jokes (sklep z dowcipami działający od 1983), Museum Context (merch Harry'ego Pottera), Walker Slater (tweedy w szkockim stylu) i The Red Door Gallery. Na dole czeka Grassmarket — historyczny plac egzekucji Covenanters, gdzie wieszano szkockich purytan. Najgłośniejszy przypadek to Maggie Dickson („Half Hangit Maggie\"): powieszona w 1724 za dzieciobójstwo, obudziła się w trumnie po drodze na cmentarz i przeżyła jeszcze 40 lat. Pub jej imienia stoi po dziś dzień.",
      },
    ],
    tips: [
      "Kolorowe fasady są najbardziej fotogeniczne z góry — podejście z Royal Mile",
      "Rowlingowa inspiracja dla Pokątnej (Diagon Alley) — faktem czy mitem, turyści uwielbiają",
      "Dawna nazwa West Bow — od łuku (bow) prowadzącego do Grassmarket",
      "Sklep Aha Ha Ha — kultowy sklep z żartami, fotogeniczny",
      "Maison de Moggy — kawiarnia z kotami (wymaga rezerwacji — jeśli chcecie, bookujcie 2 tyg. wcześniej)",
    ],
  },
};

export const placesList: Place[] = Object.values(places);
