import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import styled from 'styled-components'

const imageArray = [
  'http://expo.advance.net/img/7d646c2af2/width960/ex171112_clarkston_west_010.JPG',
  'https://image.pennlive.com/home/penn-media/width620/img/sports_impact/photo/high-school-football-state-college-at-cumberland-valley-fd02c8d691cb3a6e.jpg',
  'https://usathss.files.wordpress.com/2016/11/xxx_opening-_elite_11_dec_2264_832418301-e1480537316165.jpg',
  'https://image.advance.net/home/adv-hssn-media/width620/img/PennLive.com/news/6674a2fde29f21b75bf7ab6c88617a96/JackShea.jpg'
]

const title =  {
  fontSize: '30px'
}

const tablePlayer = {
  fontSize: '20px',
  paddingTop: '10px',
  paddingBottom: '10px',
  marginLeft: '-4px'
}

const school = {
  fontSize: '20px',
}

const tableStats = {
  fontSize: '20px'
}


class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of athlete',
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Athlete Details</h3>
        <div>
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <b style={title}>Lance Smith</b>
        <br />
        <br />
        <img src="https://www.mercurynews.com/wp-content/uploads/2017/09/bng-l-stfrancis-0902-09.jpg?w=863" height="auto" width="40%"></img>
        <br />
        <table style={tablePlayer}>
          <tbody>
            <tr>
              <td><b>Height: </b>6-1</td>
              <td><b>Weight: </b>150</td>
              <td><b>Age:</b>16</td>
            </tr>
          </tbody>
        </table >
        <div style={school}><b>High School:</b>Liberty HS</div>
        <br />
        <table style={tableStats}>
          <thead>
            <tr>
              <td>CAR</td>
              <td>YDS</td>
              <td>AVG</td>
              <td>TDS</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25</td>
              <td>120</td>
              <td>3.6</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Link route={`/athletes/${this.props.address}/requests`}>
          <a>
            <Button primary>View Requests</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default CampaignShow;
