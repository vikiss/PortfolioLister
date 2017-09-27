import React, { Component } from 'react';
import MD5 from 'md5-es';
import axios from 'axios';
import ProjectDetail from './ProjectDetail';
import TagSelector from './TagSelector';

class ProjectList extends Component {
  constructor(props) {
  super(props);
  this.handleTagChange = this.handleTagChange.bind(this);
  this.state = { projects: [], filter: '' };
}
  componentWillMount() {
    const uAgent = navigator.userAgent;
    const unixtime = Math.floor(Date.now() / 1000);
    const token = MD5.hash(`8c0cfbfa9a889b19321aa3ba4cbc3c78${unixtime}${uAgent}`);
    const axiosparams = {
          method: 'GET',
          url: 'https://pictureinsidepicture.com/api/getprlist?offset=0&limit=30',
          headers: {
            'X-Authorization-Token': token,
            'X-Authorization-Time': unixtime
          },
            withCredentials: false,
          };
    axios(axiosparams)
    .then(response => this.setState({ projects: response.data.data }))
    .catch((error) => console.log('Fetch error: ', error));
/*
fetch with cors only seems to work in chrome
const vHeaders = new Headers({  'User-Agent': uAgent,
    'X-Authorization-Token': token,  'X-Authorization-Time': unixtime });
const vInit = { method: 'GET', headers: vHeaders, mode: 'cors', cache: 'default' };
fetch('https://pictureinsidepicture.com/api/getprlist', vInit)
    //.then(response => console.log(response));
    .then((response) => response.json())
    .then((responseData) => this.setState({ projects: responseData.data }))
    .catch((error) => console.log('Fetch error: ', error));
*/
  }

  handleTagChange(value) {
   this.setState({ filter: value });
  }

  extractTagList() {
    /* retrieve a list of all tags used, raw comma-separated string first */
    const filteredTags = [];
    const rawTags = this.state.projects.map(
      project => project.tags
    );
    /* split tags and store them in an array */
     rawTags.map(
      element => {
        if (element) {
            element.split(',').map(
              singleElement => {
                if (filteredTags.indexOf(singleElement) === -1) {
                  filteredTags.push(singleElement);
                }
              return true;
              }
            );
          }
          return true;
       }
    );

  return filteredTags.sort((a, b) =>
   a.toLowerCase().localeCompare(b.toLowerCase())
  );
}

  renderProjects() {
  this.state.projects.sort((a, b) => b.year - a.year);

      return this.state.projects.map(project =>
      <ProjectDetail key={project.id} project={project} filter={this.state.filter} />
    );
  }

  render() {
      return (
        <div>
           <TagSelector
               tags={this.extractTagList()}
               selected={this.state.selected}
               handleTagChange={this.handleTagChange}
           />
           {this.renderProjects()}
        </div>
        );
     }


}

export default ProjectList;
