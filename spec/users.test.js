'use strict';
const User = require('../src/api/users/model');
const Story = require('../src/api/stories/model');
const mongoose = require('../src/services/mongoose');
const assert = require('assert');

describe('Users unit tests ', () => {

    before((done) => {
        mongoose.connection.collections.users.drop();
        mongoose.connection.collections.stories.drop(() => { done() });
    });

    describe('#User', () => {
        it('creates an user', (done) => {
            const user = new User({username: "Piotrek", email:"piotrek@gmail.com", password:"Rodzen"});
            user.save().then(() => {
                assert(!user.isNew);
                done();
            });
        });

        it('finds user with the username', (done) => {
            User.findOne({username: 'Piotrek'})
                .then((user) => {
                    assert(user.username === 'Piotrek');
                    done();
                });
        });

        it('returns ValidationError when trying to add user without username/email/password', (done) => {
            const user = new User({});
            user.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });
    });

    describe('#Stories', () => {
        it('creates a story', (done) => {
           const story = new Story({name: 'Enemy'});
           story.save().then(() => {
              assert(!story.isNew);
              done();
           });
        });

        it('finds story with the name', (done) => {
            Story.findOne({name: 'Enemy'})
                .then((story) => {
                    assert(story.name === 'Enemy');
                    done();
                });
        });

        it('deletes a story', (done) => {
            const story = Story.findOne({name: 'Enemy'});
            story.remove().then(() => {
                assert(!story.isInit);
                done();
            });
        });

    });
});
