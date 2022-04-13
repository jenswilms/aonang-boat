import { useEffect, useCallback, useState, useRef } from "react";

import Calendar from "./Calendar";
import { getFirestore } from "firebase/firestore";

import { collection, query, getDocs } from "firebase/firestore";
import styles from "./home.module.css";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

import Information from "./Information";

const Home = () => {
  const db = getFirestore();
  const q = query(collection(db, "destinations"));
  const destinationRef = useRef();

  const [destinations, setDestinations] = useState([]);
  const [currentDestination, setCurrentDestination] = useState("");
  const handleChange = (event) => {
    setCurrentDestination(event.target.value);
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
      setDestinations(data);
    };
    getData(applyData);
  }, []);

  // create Mui Theme
  const boatTheme = createTheme({
    palette: {
      // mode: "dark",
      primary: {
        main: "#58a8e2",
        contrastText: "#fff",
      },
    },
    // components: {
    //   MuiSelect: {
    //     styleOverrides: {
    //       root: {
    //         color: "white",
    //         // border: "1px solid rgba(0,0,0,0.6)",
    //       },
    //     },
    //   },
    // },
    typography: {
      // allVariants: {
      //   color: "#fff",
      // },
    },
  });

  return (
    <div className={styles.main}>
      <div className={styles.bg}></div>
      <div className={styles.bgCover}></div>
      <div className={styles.container}>
        <ThemeProvider theme={boatTheme}>
          <Information destinations={destinations} />

          {destinations && (
            <div className={styles.selectDestination}>
              <h2>Find popular times &amp; destinations</h2>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className={styles.item} fullWidth>
                  <InputLabel id="destination-select-label">
                    Your destination
                  </InputLabel>
                  <Select
                    labelId="destination-select-label"
                    value={currentDestination}
                    inputRef={destinationRef}
                    label="Your destination"
                    onChange={handleChange}
                  >
                    {destinations.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          )}

          {currentDestination && (
            <Calendar destination={currentDestination} db={db} />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Home;
