import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./Education";
import ProfileExperience from "./Experience";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from '../../actions/profile';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
        
    }, [])
    return (
        <div>
        {profile === null || loading ? <Spinner /> : 
        <div>
            <Link to="/profiles" className="btn btn-light" >
            Go back to profiles
            </Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className="btn btn-dark">Edit profile</Link>)}
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? (<div>
                        {profile.experience.map(exp => (
                            <ProfileExperience key={exp._id} experience={exp} />
                        ))}
                    </div>) : (<h4>No experience credentials</h4>)}
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.education.length > 0 ? (<div>
                        {profile.education.map(edu => (
                            <ProfileEducation key={edu._id} education={edu} />
                        ))}
                    </div>) : (<h4>No education credentials</h4>)}
                </div>
                {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername} />
                )}
            </div>
        </div>}
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
