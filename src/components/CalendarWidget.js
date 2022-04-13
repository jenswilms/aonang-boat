import { useState, useRef } from "react";

import styles from "./home.module.css";
import moment from "moment";
import ReactTimeslotCalendar from "../timecalendar/js/react-timeslot-calendar";

import {
  collection,
  where,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const CalendarWidget = ({ timeslots, groups, destination, db, onSelect }) => {
  const [alertShown, setAlertShown] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  const amountRef = useRef();
  const numbers = [1, 2, 3, 4, 5, 6];

  const groupTimeslots = groups.map((group) => {
    return {
      startDate: group.date + ", " + group.timeStart,
      format: "MM/DD/YYYY, h",
      amount: group.amount,
    };
  });

  const onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
    setSelectedTimeslot(lastSelectedTimeslot.startDate);
    setAlertShown(true);
  };

  const submitHandler = async () => {
    const resultObject = {
      date: selectedTimeslot.format("MM/DD/YYYY"),
      timeStart: selectedTimeslot.format("k"),
      amount: amountRef.current.value,
      destination: destination,
    };

    //check if doc exists
    const q = query(
      collection(db, "groups"),
      where("destination", "==", resultObject.destination),
      where("date", "==", resultObject.date),
      where("timeStart", "==", resultObject.timeStart)
    );
    const querySnapshot = await getDocs(q);
    let groupId = null;
    querySnapshot.forEach((doc) => {
      groupId = doc.id;
      // groupsQuery.push(doc.data());
    });

    //if doc exists, update the current amount
    if (groupId) {
      const docRef = doc(db, "groups", groupId);
      await updateDoc(docRef, {
        amount: increment(resultObject.amount),
      });
    } else {
      //write new doc
      await addDoc(collection(db, "groups"), resultObject);
    }

    onSelect(resultObject);
    setAlertShown(false);
  };

  const boatTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#58a8e2",
        secondary: "#ec9a29",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div>
      <ReactTimeslotCalendar
        initialDate={moment().format()}
        timeslots={timeslots}
        groupTimeslots={groupTimeslots}
        onSelectTimeslot={onSelectTimeslot}
      />

      {alertShown && (
        <>
          <div className={styles.alertBg}></div>
          <div className={styles.alert}>
            <div className={styles.alertForm}>
              <p>
                <b>Let others know you want to fare with them!</b>
              </p>
              <p>
                Your date:{" "}
                <span className={styles.date}>
                  {selectedTimeslot.format("MM/DD/YYYY, hh:00 a")}
                </span>
              </p>
              <p>With how many people will you go?</p>
              <ThemeProvider theme={boatTheme}>
                <FormControl className={styles.selectItemAlert} fullWidth>
                  <InputLabel id="amount-select-label">Amount</InputLabel>
                  <Select
                    labelId="amount-select-label"
                    inputRef={amountRef}
                    label="Amount"
                  >
                    {numbers.map((number) => (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className={styles.alertButtons}>
                  <Button
                    variant="contained"
                    onClick={submitHandler}
                    className={styles.firstBttn}
                  >
                    Let others know!
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setAlertShown(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarWidget;
