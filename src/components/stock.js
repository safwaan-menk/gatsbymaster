import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";


import '../assets/sass/main.scss';

//Pull ticker data
const useStyles = theme => ({
  root: {
    width: 175,
    height: 150,
    backgroundColor: "black",
    color: "white",
  },
  title: {
    fontSize: 25,
    color: "white"
  },
  pos: {
    marginBottom: 0.5
  },
  cornerGreen: {
    backgroundColor: "green",
    width: 205,
    height: 5
  },
  cornerRed: {
    backgroundColor: "red",
    width: 205,
    height: 5
  },
  price: {
    fontSize: 20,
    responsiveFontSizes: 20
  },
  percent: {
    responsiveFontSizes: 5
  }
});

class stockCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "0",
      symbol: props.stockID,
      change: "0",
      color: "black"
    };
  }

  async componentDidMount() {
    var first = "https://sandbox.iexapis.com/stable/stock/";
    var stockName = this.state.symbol;
    var last =
      "/intraday-prices?token=Tsk_827dd833077843be8994e247ac404317&chartLast=1";
    var url = first + stockName + last;

    try {
      const resp = await fetch(url);
      const jsonData = await resp.json();
      var dVal = jsonData[0]["open"] - jsonData[0]["close"];
      var pChange = (dVal / jsonData[0]["open"]) * 100;
      pChange = pChange.toFixed(2);
      if (pChange > 0) {
        pChange = "+" + pChange.toString() + "%";
        //Change color state here GREEN
        this.setState({
          color: "green"
        });
      } else {
        pChange = pChange.toString() + "%";
        //Change color state here RED
        this.setState({
          color: "red"
        });
      }
      this.setState({
        price: jsonData[0]["close"],
        symbol: this.state.symbol,
        change: pChange
      });
    } catch (error) {
      console.log(error);
      this.setState({ price: ".......", symbol: "Loading", change: "%" });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={
              this.state.color === "red"
                ? classes.cornerRed
                : classes.cornerGreen
            }
          />
          <Typography className={classes.title} variant="h4" component="h4">
            {this.state.symbol}
          </Typography>
          <Typography className={classes.pos} />
          <Typography className={classes.price}>{this.state.price}</Typography>
          <Typography variant="h7" className={classes.percent}>
            {this.state.change}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(stockCard);
