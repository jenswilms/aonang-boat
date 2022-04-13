import { useEffect, useCallback, useState } from "react";

import CalendarWidget from "./CalendarWidget";
import { collection, query, where, getDocs } from "firebase/firestore";

const Calendar = ({ destination, db }) => {
  const q = query(
    collection(db, "groups"),
    where("destination", "==", destination)
  );

  const [groups, setGroups] = useState([]);
  const [newInfo, setNewInfo] = useState();

  const onSelect = (clickedGroup) => {
    setNewInfo(clickedGroup);
  };

  const getData = useCallback(
    async (transformData) => {
      const querySnapshot = await getDocs(q);
      let groupsQuery = [];
      querySnapshot.forEach((doc) => {
        groupsQuery.push(doc.data());
      });

      transformData(groupsQuery);
    },
    [q]
  );

  useEffect(() => {
    const applyData = (data) => {
      setGroups(data);
    };
    getData(applyData);
  }, [destination, newInfo]);

  let timeslots = [];
  if (destination === "railay") {
    timeslots = [
      ["8", "9"],
      ["9", "10"],
      ["10", "11"],
      ["11", "12"],
      ["13", "14"],
      ["14", "15"],
      ["15", "16"],
      ["16", "17"],
      ["17", "18"],
    ];
  } else {
    timeslots = [
      ["8", "9"],
      ["9", "10"],
      ["10", "11"],
      ["11", "12"],
      ["13", "14"],
      ["14", "15"],
      ["15", "16"],
    ];
  }

  return (
    <div>
      <CalendarWidget
        timeslots={timeslots}
        groups={groups}
        destination={destination}
        db={db}
        onSelect={onSelect}
      />
    </div>
  );
};

export default Calendar;
