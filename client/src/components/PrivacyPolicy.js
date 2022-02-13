import React, {useContext, useEffect, useState} from 'react'
import {ContentContext} from "../App";
import {stateToHTML} from "draft-js-export-html";
import {convertFromRaw} from "draft-js";

const PrivacyPolicy = () => {
    const { content } = useContext(ContentContext);

    const [main, setMain] = useState(null);

    useEffect(() => {
        if(content) {
            setMain(stateToHTML((convertFromRaw(JSON.parse(content.privacy_policy)))))
        }
    }, [content]);

    return <main className="pageText section" dangerouslySetInnerHTML={{__html: main}}>
{/*        <h1 className="pageText__header">*/}
{/*            Polityka prywatności*/}
{/*            serwisu internetowego www.draft4u.com.pl*/}
{/*        </h1>*/}
{/*        <p>*/}
{/*            Niniejsza polityka prywatności została przyjęta w prepisami rozporządzenia Parlamentu*/}
{/*            Europejskiego i Rady (UE) nr 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób*/}
{/*            fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego*/}
{/*            przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (Dziennik Urzędowy Unii*/}
{/*            Europejskiej nr L 119/1 z 4.5.2016; dalej: RODO). Celem polityki jest w szczególności*/}
{/*            wykonanie obowiązku informacyjnego, o którym mowa w art. 13 i 14 RODO.*/}
{/*        </p>*/}
{/*        <h2 className="pageText__subheader">*/}
{/*            1. Definicje*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            W treści niniejszej polityki posługujemy się poniższymi zwrotami:<br/>*/}
{/*            1) Serwis – serwis internetowy prowadzony przez DRAFT4U sp. z o.o. pod*/}
{/*            adresem www.draft4u.com.pl.<br/>*/}
{/*            2) My, DRAFT4U, Administrator – DRAFT4U spółka z ograniczoną odpowiedzialnością z*/}
{/*            siedzibą w Katowicach, 40 – 246, ul. Porcelanowa 23, zarejestrowana w Rejestrze*/}
{/*            Przedsiębiorców Krajowego Rejestru Sądowego (Wydział VIII Gospodarczy Krajowego*/}
{/*            Rejestru Sądowego Sądu Rejonowego w Bielsku-Białej) pod numerem KRS 897134,*/}
{/*            NIP: 5472224382, REGON: 388762775, adres e–mail: biuro@draft4u.com.pl, nr tel.*/}
{/*            535480814, 790731997.<br/>*/}
{/*            3) Ty, Pan, Pani, Państwo, Klient – osoby, których dane osobowe są przetwarzane przez*/}
{/*            DRAFT4U w związku z korzystaniem z Serwisu.*/}
{/*        </p>*/}
{/*        <h2 className="pageText__subheader">*/}
{/*            2. Kim jest administrator danych?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Administrator danych to osoba ustalająca cele i sposoby przetwarzania danych osobowych. Administratorem Państwa danych osobowych jest DRAFT4U sp. z o.o.*/}
{/*        </p>*/}
{/*        <h2 className="pageText__subheader">*/}
{/*            3. Czyje dane osobowe przetwarzamy?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            W związku z prowadzoną działalnością, przetwarzamy w szczególności dane osobowe użytkowników Serwisu. Zakres przetwarzanych danych każdorazowo jest adekwatny do celów przetwarzania.*/}
{/*        </p>*/}
{/*        <h2 className="pageText__subheader">*/}
{/*            4. Jakie dane gromadzimy za pomocą Serwisu, a także w jakim celu je wykorzystujemy?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Zakres Państwa danych, jakie gromadzimy oraz cele ich przetwarzania uzależnione są od wykorzystywanych funkcjonalności Serwisu, i tak:*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub">*/}
{/*            4.1. Przeglądanie witryny Serwisu*/}
{/*        </h3>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jakie dane gromadzimy?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*        Dane zapisywane w formie logów serwera, w których użytkownik identyfikowany jest jako adres URL. Dane te obejmują:*/}
{/*        czas nadejścia zapytania,*/}
{/*        <br/>*/}
{/*        czas wysłania odpowiedzi,*/}
{/*            <br/>*/}
{/*        nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,*/}
{/*            <br/>*/}
{/*        informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,*/}
{/*            <br/>*/}
{/*        adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,*/}
{/*            <br/>*/}
{/*        informacje o przeglądarce użytkownika,*/}
{/*            <br/>*/}
{/*        Informacje o adresie IP.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            W jakim celu przetwarzamy dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Na potrzeby administrowania serwerem, na którym zapisany jest Serwis, a także analizy statystycznej ruchu w Serwisie.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Czy musisz podawać nam swoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Podanie danych jest dobrowolne, z zastrzeżeniem że warunkuje możliwość prawidłowego korzystania z Serwisu.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Na jakiej podstawie prawnej przetwarzamy Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            W oparciu o:*/}
{/*            <br/>*/}
{/*            zawartą umowę, której przedmiot stanowi usługa świadczona drogą elektroniczną w postaci udostępnienia Serwisu (art. 6 ust. 1 lit. b RODO) oraz*/}
{/*            <br/>*/}
{/*            nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO) – polegający na możliwości udostępniania Serwisu osobom trzecim, a także zagwarantowaniu prawidłowego wyświetlania Serwisu.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Komu możemy udostępniać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Dane osobowe mogą zostać udostępnione podmiotom trzecim wyłącznie w przypadku, gdy będziemy do tego zobowiązani lub uprawnieni na podstawie przepisów prawa. Odbiorami danych mogą być zwłaszcza:*/}
{/*            <br/>*/}
{/*            osoby obsługujące naszą infrastrukturę lub systemy informatyczne,*/}
{/*            <br/>*/}
{/*            osoby zapewniające hosting danych,*/}
{/*            <br/>*/}
{/*            podwykonawcy uczestniczący w realizacji zawartych z Tobą umów.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jak długo będziemy przetwarzać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Przez czas niezbędny do wykonania zawartych umów lub przez czas trwania naszego prawnie uzasadnionego interesu w przetwarzaniu danych – przy czym w każdym przypadku nie krócej, niż przez okres Twoich odwiedzin na witrynach Serwisu.*/}
{/*            <br/>*/}
{/*            Pamiętaj, że w przypadku gdy podstawą przetwarzania danych jest prawnie uzasadniony interes – masz możliwość zgłoszenia sprzeciwu względem dalszego przetwarzania danych, zgodnie z pkt. 8 poniżej.*/}
{/*        </p>*/}


{/*        <h3 className="pageText__subheader__sub">*/}
{/*            4.2. Newsletter*/}
{/*        </h3>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jakie dane gromadzimy?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Adres poczty elektronicznej.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            W jakim celu przetwarzamy dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Dla celów marketingowych, związanych z wysyłką newslettera, w tym do informowania o treści naszej oferty, aktualnych promocjach, konkursach, programach lojalnościowych itd.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Czy musisz podawać nam swoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Podanie danych jest dobrowolne, z zastrzeżeniem że warunkuje możliwość otrzymywania newslettera.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Na jakiej podstawie prawnej przetwarzamy Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            W oparciu o zgodę na otrzymywanie newslettera (art. 6 ust. 1 lit. a RODO) – udzieloną w szczególności poprzez uzupełnienie stosownego formularza w obrębie Serwisu i kliknięcie zatwierdzającego przycisku („Zapisz się”).*/}
{/*            Pamiętaj, że masz prawo do cofnięcia zgody w dowolnym momencie (np. poprzez wysyłkę stosownej wiadomości email na adres: biuro@draft4u.com.pl), bez wpływu na zgodność z prawem przetwarzania którego dokonano na podstawie zgody przed jej cofnięciem.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Komu możemy udostępniać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Dane osobowe mogą zostać udostępnione podmiotom trzecim wyłącznie w przypadku, gdy będziemy do tego zobowiązani lub uprawnieni na podstawie przepisów prawa. Odbiorami danych mogą być zwłaszcza:*/}
{/*<br/>*/}
{/*            a) osoby obsługujące naszą infrastrukturę lub systemy informatyczne,*/}
{/*<br/>*/}
{/*            b) osoby zapewniające hosting danych,*/}
{/*<br/>*/}
{/*            c) podwykonawcy, za pomocą których możemy realizować wysyłkę newslettera.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jak długo będziemy przetwarzać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Do czasu cofnięcia zgody na otrzymywanie newslettera.*/}
{/*        </p>*/}


{/*        <h3 className="pageText__subheader__sub">*/}
{/*            4.3. Rejestracja konta w serwisie*/}
{/*        </h3>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jakie dane gromadzimy?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Dane niezbędne do rejestracji konta w Serwisie, w tym: imię i nazwisko, adres, adres poczty elektronicznej, numer telefonu, login, hasło.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            W jakim celu przetwarzamy dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            W celu:*/}
{/*            <br/>*/}
{/*            a) wykonania umowy o świadczenie usługi elektronicznej – w postaci założenia Konta w Serwisie,*/}
{/*            <br/>*/}
{/*            b) wykonania zamówień złożonych za pomocą Konta, w tym: wysyłki powiązanych wiadomości email, wysyłki towaru na wskazany adres oraz obsługi ewentualnych reklamacji,*/}
{/*            <br/>*/}
{/*            c) dopasowania treści Serwisu do Twoich upodobań, w zależności od czynności podejmowanych przez Ciebie w Serwisie - w tym w zakresie rekomendowanych towarów lub usług.*/}
{/*            <br/>*/}
{/*            d) marketingu towarów lub usług DRAFT4U, oferowanych w ramach Serwisu - w tym do informowania o treści naszej oferty, aktualnych promocjach, konkursach, programach lojalnościowych itd.,*/}
{/*            <br/>*/}
{/*            e) prowadzeniu korespondencji za pomocą wszelkich znanych technologii, w tym: poczty tradycyjnej, poczty elektronicznej (email) lub innych metod komunikacji (np. komunikatorów internetowych itd.).*/}
{/*            <br/>*/}
{/*            f) tworzenia zestawień, analiz i statystyk – co obejmuje zwłaszcza badania marketingowe, analizy danych handlowych, planowanie rozwoju usług itd.*/}
{/*            <br/>*/}
{/*            g) dochodzenia roszczeń lub obrony przed zgłoszonymi roszczeniami.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Czy musisz podawać nam swoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Podanie danych jest dobrowolne, z zastrzeżeniem że warunkuje możliwość rejestracji Konta w Serwisie i korzystanie z powiązanych funkcjonalności Serwisu.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Na jakiej podstawie prawnej przetwarzamy Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            W oparciu o:*/}
{/*            <br/>*/}
{/*            a) zawarte umowy, których przedmiot stanowi prowadzenie Konta w Serwisie, a także dostawa towarów lub świadczenie usług zamówionych za pośrednictwem Serwisu (art. 6 ust. 1 lit. b RODO),*/}
{/*            <br/>*/}
{/*            b) powszechnie obowiązujące przepisy, które nakładają na nas obowiązki prawne, dla realizacji których konieczne jest przetwarzanie danych - w szczególności w zakresie prawa podatkowego oraz przepisów o rachunkowości lub archiwizacji (art. 6 ust. 1 lit. c RODO),*/}
{/*            <br/>*/}
{/*            c) nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO) – polegający na możliwości podejmowania działań wskazanych w pkt. II lit. c-g powyżej.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Komu możemy udostępniać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Dane osobowe mogą zostać udostępnione podmiotom trzecim wyłącznie w przypadku, gdy będziemy do tego zobowiązani lub uprawnieni na podstawie przepisów prawa. Odbiorami danych mogą być zwłaszcza:*/}
{/*<br/>*/}
{/*            a) osoby obsługujące naszą infrastrukturę lub systemy informatyczne,*/}
{/*            <br/>*/}
{/*            b) osoby zapewniające hosting danych,*/}
{/*            <br/>*/}
{/*            c) podwykonawcy, za pomocą których możemy realizować zamówienia,*/}
{/*            <br/>*/}
{/*            d) osoby świadczące usługi związane z wykonaniem lub ulepszeniem procesu sprzedaży (np. kurierzy lub przewoźnicy, pośrednicy płatności, rzeczoznawcy uczestniczący w procedurach reklamacji),*/}
{/*            <br/>*/}
{/*            e) osoby świadczące na naszą rzecz usługi audytorskie lub doradcze – np. w zakresie pomocy prawnej, podatkowej lub rachunkowej,*/}
{/*            <br/>*/}
{/*            f) nabywcy wierzytelności, związanych z transakcjami zawieranymi za pomocą Serwisu – w przypadku, gdy zdecydujemy się na dokonanie zbycia takich wierzytelności, w szczególności z uwagi na istnienie znacznych zaległości płatniczych.*/}
{/*        </p>*/}
{/*        <h3 className="pageText__subheader__sub__sub">*/}
{/*            Jak długo będziemy przetwarzać Twoje dane?*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Zależnie od podstawy przetwarzania – będzie to:*/}
{/*<br/>*/}
{/*            a) czas niezbędny do wykonania umowy zawartej za pośrednictwem Serwisu, a także przedawnienia związanych z tym roszczeń,*/}
{/*            <br/>*/}
{/*            b) czas trwania obowiązków prawnych, z których wynika konieczność przetwarzania Twoich danych,*/}
{/*            <br/>*/}
{/*            c) czas istnienia naszego prawnie uzasadnionego interesu w przetwarzaniu danych.*/}
{/*            <br/>*/}
{/*            Pamiętaj, że w przypadku gdy podstawą przetwarzania danych jest prawnie uzasadniony interes – masz możliwość zgłoszenia sprzeciwu względem dalszego przetwarzania danych, zgodnie z pkt. 8 poniżej*/}
{/*        </p>*/}

{/*        <h3 className="pageText__subheader__sub">*/}
{/*            4.4. Pliki cookies*/}
{/*        </h3>*/}
{/*        <p className="left-40">*/}
{/*            Polityka plików cookies stanowi załącznik nr 1 do niniejszej Polityki prywatności i znajduje się <a href="/polityka-plikow-cookies">TUTAJ</a>.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            5. Czy dane mogą być przetwarzane w procesach obejmujących zautomatyzowane podejmowanie decyzji, w tym profilowanie „kwalifikowane”?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Obecnie nie stosujemy żadnych operacji, w ramach których dochodziłoby do zautomatyzowanego podejmowania  decyzji wywołujących po stronie ich adresatów skutki prawne lub w podobny sposób istotnie na nich wpływających. W przypadku wdrożenia w przyszłości takich operacji związanych z przetwarzaniem danych osobowych – zapewnimy ich zgodność ze właściwymi przepisami, w tym art. 22 RODO.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            6. Czy Twoje dane osobowe mogą być przekazywane poza Europejski Obszar Gospodarczy (EOG)?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Obecnie nie przewidujemy przekazywania Twoich danych poza Europejski Obszar Gospodarczy. Nie wykluczamy jednak, że w przyszłości możemy uznać to za zasadne. W takim wypadku, dane będą zabezpieczone w sposób wymagany przez powszechnie obowiązujące przepisy, w szczególności poprzez zastosowanie tzw. standardowych klauzul umownych (SCC).*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            7. Jakie prawa przysługują Ci w związku z przetwarzaniem danych?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Możesz wystąpić do nas w szczególności z wnioskiem o:*/}
{/*<br/>*/}
{/*            1) dostęp do przetwarzanych przez nas danych (w tym: informację o przetwarzaniu przez nas danych lub przekazanie kopii danych),*/}
{/*            <br/>*/}
{/*            2) sprostowanie (poprawienie) danych,*/}
{/*            <br/>*/}
{/*            3) ograniczenie przetwarzania (wstrzymanie operacji na danych lub nieusuwanie danych),*/}
{/*            <br/>*/}
{/*            4) usunięcie danych (“prawo do bycia zapomnianym”),*/}
{/*            <br/>*/}
{/*            5) przeniesienie danych do innego administratora.*/}
{/*            <br/>*/}
{/*            Powyższe wnioski mogą być wysyłane w szczególności w sposób określony w pkt. 11 poniżej – i będą rozpatrywane zgodnie z właściwymi przepisami, w tym art. 15-20 RODO.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            8. Prawo sprzeciwu*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Niezależnie od powyższego, masz prawo do wniesienia sprzeciwu względem przetwarzania Twoich danych, które realizowane jest w oparciu o nasz prawnie uzasadniony interes. W takim wypadku:*/}
{/*<br/>*/}
{/*            1) jeżeli dane osobowe są przetwarzane na cele marketingu – niezwłocznie zaprzestaniemy takiego przetwarzania.*/}
{/*            <br/>*/}
{/*            2) jeżeli podstawą przetwarzania danych jest interes innego rodzaju – zaprzestaniemy takiego przetwarzania, chyba że wykażemy: a) że wspomniany interes jest nadrzędny wobec Twoich interesów, praw i wolności lub też b) istnieje podstawa do ustalenia, dochodzenia lub obrony przed roszczeniami.*/}
{/*            <br/>*/}
{/*            Prawo sprzeciwu może być realizowane w szczególności poprzez wysyłkę stosownego oświadczenia w sposób określony w pkt. 11 poniżej.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            9. Skarga do organu nadzorczego*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            W przypadku gdy uznasz, że przetwarzanie Twoich danych narusza obowiązujące przepisy - masz prawo wnieść skargę do organu nadzorczego, tj. Prezesa Urzędu Ochrony Danych Osobowych. Dane kontaktowe PUODO dostępne są w szczególności na witrynie https://uodo.gov.pl/pl/p/kontakt.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            10. Miejsce publikacji oraz aktualizacje polityki prywatności*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            Niniejsza polityka prywatności może od czasu do czasu podlegać zmianom. Aktualna wersja polityki będzie każdorazowo dostępna przez cały czas na naszej stronie internetowej pod adresem: www.draft4u.com.pl.*/}
{/*        </p>*/}

{/*        <h2 className="pageText__subheader">*/}
{/*            11. Jak można się z nami skontaktować?*/}
{/*        </h2>*/}
{/*        <p>*/}
{/*            W razie jakichkolwiek pytań dotyczących sposobu wykorzystania przez nas Państwa danych osobowych, można się z nami skontaktować telefonicznie, pocztą elektroniczną lub listownie pod następującymi numerami i adresami:*/}
{/*<br/><br/>*/}
{/*            DRAFT4U sp.  z o.o.*/}
{/*<br/>*/}
{/*            ul. Porcelanowa 23, 40-246 Katowice - z dopiskiem: „ochrona danych osobowych”*/}
{/*<br/>*/}
{/*            tel. 535480814 lub 790731997; e-mail: biuro@draft4u.com.pl*/}
{/*        </p>*/}
    </main>
}

export default PrivacyPolicy;


















