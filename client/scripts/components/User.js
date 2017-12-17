import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderPerson from './RenderPeopleWithPoints.js';

import { getUserTotalPoints } from '../utils';

import { updateLeague } from '../operations/league-operations.js';

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.team) {
      return (
        <p>This user has not drafted anybody 😱</p>
      );
    }
    const { isMe } = this.props;
    const fullTeam = this.props.team.map((id) => {
      return this.props.peopleDate[id];
    })
    const grandPoints = getUserTotalPoints(fullTeam);
    console.log(grandPoints);
    return (
      <div className="userBlock">
        <p> {isMe ? `You have ${grandPoints} points total!` : `This user has ${grandPoints} point total!`} </p>
        <p> Team includes:</p>
        {fullTeam.map((person) => {
          return (
            <div>
              {person.personName}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, leagueId } = ownProps;
  const team = ownProps.data.teams.filter((item) => {
    return item.leagueId == ownProps.leagueId;
  });
  let teamMembers;
  if (team.length === 0) {
    teamMembers = null;
  } else {
    teamMembers = team[0].people;
  }
  return {
    team: teamMembers,
  }
}

export default connect(mapStateToProps, null)(User);