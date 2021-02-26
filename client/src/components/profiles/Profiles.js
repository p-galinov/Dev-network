import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile"

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [])

    return (
        <div>
            {loading ? <Spinner /> : 
            <div>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._Id} profile={profile} />
                        ))
                    ) : <h2> No profiles found </h2>}
                </div>
            </div>}
        </div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, ({ getProfiles }))(Profiles)
