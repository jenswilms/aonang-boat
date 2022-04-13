import { useState } from "react";

import styles from "./information.module.css";
import { Button } from "@mui/material";

const Information = ({ destinations }) => {
  const [infoShown, setInfoShown] = useState(false);

  return (
    <div className={styles.allInfo}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome to Ao Nang Boat services!</h1>
        <p>
          Find popular timeslots, so you don't have to wait hours for other
          people! And let other people know when you want to travel, so you
          encourage them to come at the same time.
        </p>
      </div>
      <div className={styles.allDestinations}>
        {!infoShown && (
          <Button onClick={() => setInfoShown(true)} variant="contained">
            Show ferry information
          </Button>
        )}

        {infoShown && (
          <>
            {" "}
            <p className={styles.title}>
              <b>Available ferries</b>
            </p>
            {destinations.map((destination) => (
              <div className={styles.destination}>
                <p className={styles.destinationTitle}>
                  Destination: {destination.name}
                </p>
                <p>Nearby locations:</p>
                <ul>
                  {destination.allLocations.map((sublocation) => (
                    <li>{sublocation}</li>
                  ))}
                </ul>
                <p>Price: {destination.price}BHT</p>
                <p>{destination.return ? "Return ticket" : "One way"}</p>
              </div>
            ))}
            <Button onClick={() => setInfoShown(false)} variant="contained">
              Hide information
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Information;
