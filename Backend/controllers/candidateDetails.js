const async = require('async');
const Candidate = require('../model/candidateModel');

exports.registerCandidates = async (candidates) => {
    try {
        async.eachSeries(candidates.slice(1), async (candidateRow, callback) => {
            try {
                const [name, email, mobileNo, dateOfBirth, workExperience, resumeTitle, currentLocation, postalAddress, currentEmployer, currentDesignation] = candidateRow;

                if (candidateRow.every(cell => cell === null || cell === '')) {
                    return callback(); 
                }

                const existingCandidate = await Candidate.findOne({ email });
                if (existingCandidate) {
                    console.log(`Skipping duplicate candidate`);
                    return callback(); 
                }

                const newCandidate = new Candidate({
                    name,
                    email,
                    mobileNo,
                    dateOfBirth,
                    workExperience,
                    resumeTitle,
                    currentLocation,
                    postalAddress,
                    currentEmployer,
                    currentDesignation
                });

                await newCandidate.save();
                return callback(); 
            } catch (error) {
                return ; 
            }
        }, (error) => {
            if (error) {
                throw error; 
            }
            console.log('All candidates processed successfully');
        });
    } catch (error) {
        throw error;
    }
}
