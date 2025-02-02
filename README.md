[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5L9qPE2q)

# ToDo app

Det här är en applikation där man kan skapa ett konto och logga in (har man ett konto så kan man bara använda sig av sign in) för att hålla reda på sina Tasks som man behöver göra.

### Funktionalitet

- Skapa en användare
- Logga in som en befintlig användare och se sina tidigare tasks
- Skapa nya tasks
- Redigera task
- Markera task som klar
- Ta bort en specifik task
- Ta bort alla Tasks på hela användaren
- Logga ut från applikationen

## Projekt reflektion

Min kod gör allt som det ska, man behöver logga in till applikationen och när man väl är inloggad så kan man alltså lägga till en task, editera tasken efter den är tillagd, ta bort en speciell task eller ta bort alla tasks på todo listan. Det är även först när man är inloggad som man ser alla sina egna tasks. För att göra det så har jag skapat olika policys i Supabase som gör att användaren kan utföra dessa uppgifter ( CRUD ).

Jag började med att skapa två olika interfaces för både user och tasks, vilket jag sedan har korrigerat då man får med färdiga bibliotek när man laddar hem Supabase till ens projekt. Vilket gör att jag kan använda mig av den färdiga interfacen för Users och autentiseringen.
Supabase har även en färdig autentisering funktion som man kan koppla till sitt projekt vilket gjorde att man kunde ställa in sina egna policys.

En funktion som hade varit bra att lägga till är att jag lägger till verifieringsmail när man först skapar ett konto på todo listan. Så att jag vid första kontoskapandet skulle kunna säkerställa att användaren skriver in en mail som är aktiv och som dom har tillgång till.
Jag tog bort detta för att kunna testa att skapa konton på flera testanvändare, för att säkerställa att listorna visas för fel personer.

Då detta är ett mindre projekt så har jag gjort en enklare inloggning, men om detta hade varit för ett större företag så hade jag behövt jobba mer med säkerheten, så att det är 2FA samt att man blir utloggad efter ett visst antal minuter, så att ingen annan skulle komma åt ens todo-lista.

Jag är väldigt nöjd med min kod då den är lättläst och man kan lätt hänga med i de olika funktioner som deklareras, jag har även lagt ner tid på att ge bra funktionsnamn och variabelnamn så att jag lättare kan se vad allt gör.

Jag har tyckt att detta projekt har varit väldigt svårt att utföra, jag har behövt göra om projektet en gång helt och hållet för att få till kopplingen till Supabase. Jag hade först sparat det mot localStorage och tyckte att det var lättare att skriva om än att korrigera i min egna kod, det var då jag fick möjlighet att ändra om alla variable namn och funktionsnamn så att jag lättare kunde navigera i projektet.

I början av projektet så hade jag inte så mycket felhantering, vilket gjorde att det var extra svårt att se vad som gick fel, vilket jag sedan la till, så att consolen skulle logga vad som hände och om det blev något felmeddelande.

Det finns utvecklingsmöjligheter med appen, t.ex att man först behöver skapa en lista som man sedan kan skapa tasks på, istället för att man endast kan skapa task. Det hade varit en bra feetuare men hade behövt en extra tabell och funktioner som uppdaterar tabellen med listor som har relation med tasksen vilket inte var en del av scopet.
Jag har även använt appen själv när jag gjort klart ToDo projekt, för att hålla koll på alla kriterier jag behöver göra. Så jag har testat live att den fungerar samt kunnat komma ihåg allt som behövdes göras!
