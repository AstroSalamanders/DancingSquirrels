import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ViewRating from './ViewRating.jsx';
import Rating from './Rating.jsx';
import DisplayReview from './DisplayReview.jsx';
import WriteReview from './WriteReview.jsx';
import ReactAudioPlayer from 'react-audio-player'

class PodcastEpisodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.podcastEpisodes.rating || 0,
      noofreviews: this.props.podcastEpisodes.noofreviews || 0,
      nowPlaying: null,
      loggedIn: '',
    };
  }

  componentDidMount() {

    var reactContext = this;

    $.get('/getUser', function(results) {
      if (results.user) {
        reactContext.setState({
          loggedIn: results.user
        });
      }
    });

    document.addEventListener('play', function(e){
      //console.log('reactContext', reactContext.props.podcastEpisodes)
      reactContext.setState({nowPlaying: e.target});
      //console.log('presend', reactContext.state.nowPlaying)
      var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
              if(!audios[i].paused){
                console.log(audios[i].currentTime)
                audios[i].pause();
              }
            }
        }
    }, true);

    var collectionIds = [this.props.podcastEpisodes.collectionId];

    $.get('/search-rating', { collectionIds })
      .done(response => {
        if (response && Object.keys(response).length > 0) {
          this.setState({
            rating: Math.round(response[0].rating),
            noofreviews: response[0].noofreviews
          });
        }
      });

    //$.get() request to update all song. sends states, updates states when done to audio player
  }

  displayRefreshOnReviewSubmit() {
    this.child.refresh();
  }

  getTime(e){
    var reactContext = this;
    console.log(e)
    var options = {
      username: this.state.loggedIn,
      episode_id: $(this.state.nowPlaying).attr('src')
    }
    $.get('/played', options)
    .done((data, state)=>{
      console.log('setting time if less than 0', data.time, reactContext.state.nowPlaying.currentTime)
      if(reactContext.state.nowPlaying.currentTime === 0){
        reactContext.state.nowPlaying.currentTime = data.time;
      }
    })
  }

  updateTime (time){


    var timeInSeconds = Math.floor(this.state.nowPlaying.currentTime)
    var options = {
      username: this.state.loggedIn,
      episode_id: $(this.state.nowPlaying).attr('src'),
      time: timeInSeconds
    }
    //console.log(options)
    if(timeInSeconds){
      $.post('/played', options)
      
    }
  }


  render() {

    return (

      <div className='podcast-episodes'>

        <div className='podcast-description'>

          <img src={this.props.podcastEpisodes.image} 
               height='200px' 
               width='200px' />

          <h2>{this.props.podcastEpisodes.title}</h2>
          <p>{this.props.podcastEpisodes.description}</p>

          <div className='ratingcontainer'>
              <div className='viewrating'>
                <ViewRating rating={this.state.rating}/>
              </div>
              <div className='numreviews'>
                {this.state.noofreviews} reviews
              </div>
              <div className='addrating'>
                <Rating collectionId={this.props.podcastEpisodes.collectionId}/>
              </div>
            </div>

        </div>

        <div className="episodeDivider"></div>

        <div className='episodesContainer'>
        
          {this.props.podcastEpisodes.episodes.map((episode, itr) => {
            
            return (
              <div key={itr} className='podcast-episode'>
                <h4 className="episodeTitle">{episode.title}</h4>
                <ReactAudioPlayer 
                  className="episodePlayer"
                  src={episode.url}
                  controls={true}
                  preload="none"
                  listenInterval={1000}
                  onPause={(e)=>{this.updateTime(e.target.currentTime)}}
                  onPlay={(e)=>{this.getTime(e)}}
                  //onPlay={(e)=>{this.getTime($(e.target).parent().index(), e.target.currentTime)}}
                  onListen={(e)=>{this.updateTime(e)}}
                />

              </div>
            );
          })}

        </div>

        <div className="addReviewContainer">

          <h3>User Reviews</h3>

          <WriteReview 
            collectionId={this.props.podcastEpisodes.collectionId} 
            refreshReview={this.displayRefreshOnReviewSubmit.bind(this)}
          />

          <DisplayReview 
            collectionId={this.props.podcastEpisodes.collectionId} 
            ref={instance => { this.child = instance; }} 
          />

        </div>
        
      </div>

    );
  }
}
// {
//   this.state.renderEpisodes
//    ? <div className='podcast-episodes-wrapper'>
//     {
//       this.state.podcast.episodes.map((episode, itr) => {
//         return (
//           <div key={itr} className='podcast-episode'>
//             <h3>Title: {episode.title}</h3>
//             <audio controls>
//               <source src={episode.url} type="audio/mpeg" />
//             </audio>
//           </div>
//         );
//       }).slice(0, 10)
//     }
//     </div>
//    : null
// }

PodcastEpisodes.propTypes = {
  podcastEpisodes: PropTypes.object.isRequired
};

export default PodcastEpisodes;
