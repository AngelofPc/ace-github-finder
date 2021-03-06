import React, { Component } from 'react';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading, repos } = this.props;
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn btn-light">
            Back to search
          </Link>
          Hireable:{' '}
          {hireable ? (
            <i className="fas fa-check text-success">Yes</i>
          ) : (
            <i className="fas fa-times-circle text-danger">No </i>
          )}
          <div className="card grid-2">
            <div className="all-center">
              <img
                src={avatar_url}
                className="round-img"
                alt=""
                style={{ width: '150px' }}
              />
              <h1>{name}</h1>
              {location && (
                <>
                  <p>Location: {location}</p>
                </>
              )}
            </div>
            <div>
              {bio && (
                <>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </>
              )}
              <a href={html_url} className="btn btn-dark my-1">
                Visit Github Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <>
                      <strong>Username: </strong> {login}
                    </>
                  )}
                </li>

                <li>
                  {company && (
                    <>
                      <strong>Company: </strong> {company}
                    </>
                  )}
                </li>

                <li>
                  {blog && (
                    <>
                      <strong>Website: </strong> {blog}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Followers: {following}</div>
            <div className="badge badge-danger">
              Public Repos: {public_gists}
            </div>
            <div className="badge badge-dark">Public Gists: {public_repos}</div>
          </div>
          <Repos repos={repos} />
        </>
      );
    }
  }
}

export default User;
