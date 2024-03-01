import { useState } from "react";
import { List } from "./components/List";
import { Random } from "./components/Random";
import { people } from "./data";
import { Filters } from "./components/Filters";
import "./App.css";

export type Filters = {
  gender: "alle" | "mann" | "kvinne";
  status: "alle" | "midlertidig" | "doed" | "utflyttet" | "levende";
};

function App() {
  const [view, setView] = useState<"RANDOM" | "LIST">("RANDOM");
  const [filters, setFilters] = useState<Filters>({
    gender: "alle",
    status: "alle",
  });

  const filteredPeople = people
    .filter((person) => {
      if (filters.gender === "alle") return person;
      if (filters.gender === "mann" && person.gender === "mann") return person;
      if (filters.gender === "kvinne" && person.gender === "kvinne")
        return person;

      // gjør det samme for status
    })
    .filter((person) => {
      if (filters.status === "alle") return person;
      if (filters.status === "levende" && person.status !== "doed")
        return person;
      if (filters.status === "doed" && person.status === "doed") return person;
      if (filters.status === "utflyttet" && person.status === "utflyttet")
        return person;
      if (filters.status === "midlertidig" && person.status === "midlertidig")
        return person;
    });

  return (
    <>
      <Filters
        filters={filters}
        setFilters={setFilters}
        view={view}
        setView={setView}
      />
      <main className="container max-w-[1440px] mx-auto">
        {view === "RANDOM" && <Random people={filteredPeople} />}
        {view === "LIST" && <List people={filteredPeople} />}
      </main>
    </>
  );
}
export default App;
