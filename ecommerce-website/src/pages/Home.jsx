import { Button } from "react-bootstrap";
import classes from './Home.module.css';
const Home = () => {
    const arrtour = [
        {
          month: "JUL16",
          state: "DETROIT, MI",
          region: "DTE ENERGY MUSIC THEATRE",
        },
        {
          month: "JUL19",
          state: "TORONTO,ON",
          region: "BUDWEISER STAGE",
        },
        {
          month: "JUN22",
          state: "BRISTOW, VA",
          region: "JIGGY LUBE LIVE",
        },
        {
          month: "JUL29",
          state: "PHOENIX, AZ",
          region: "AK-CHIN PAVILION",
        },
        {
          month: "AUG2",
          state: "LAS VEGAS, NV",
          region: "T-MOBILE ARENA",
        },
        {
          month: "AUG7",
          state: "CONCORD, CA",
          region: "CONCORD PAVILION",
        },
      ];
    return(
        <section>
        <div className={classes["home-album"]}>
          <h1>The Generics</h1>
          <h2>Get our Latest Album</h2>
          <p>Try This</p>
        </div>
        <div className={classes["home-tour"]}>
          <h3>Tour</h3>
          {arrtour.map((item) => (
            <div className={classes["arrtour"]} key={item.month}>
              <p>{item.month}</p>
              <p>{item.state}</p>
              <p>{item.region}</p>
              <Button variant="primary">BUY TICKETS</Button>
            </div>
          ))}
        </div>
      </section>
    )
}
export default Home;