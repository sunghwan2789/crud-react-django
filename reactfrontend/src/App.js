import React from 'react';
import './App.css';
import api from './api';
import PostView from './components/PostView';
import {
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,

} from '@material-ui/core';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      results: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    let results = await api.getAllPosts();
    this.setState({ results: results.data });
  }

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlingSubmit = async (event) => {
    event.preventDefault();

    let result = await api.createPost({
      title: this.state.title,
      content: this.state.content,
    });
    this.setState({ title: '', content: '', });
    this.getPosts();
  }

  handlingDelete = async (id) => {
    await api.deletePost(id);
    this.getPosts();
  }

  render() {
    return (
      <div className="App">

        <Container maxWidth="lg">

          <div className="PostingSection">
            <Paper className="PostingPaper">
              <h2>대나무 숲 글 작성하기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>
                <TextField
                  variant="outlined"
                  label="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  name="title"
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  multiline
                  rows="4"
                  label="content"
                  name="content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                  margin="normal"
                />
                <Button variant="outlined" color="primary" type="submit">제출하기</Button>
              </form>
            </Paper>
          </div>
          <div className="ViewSection">
            {
              this.state.results.map(post =>
                <Card key={post.id} variant="outlined" className="card">
                <CardContent>
                  <Typography>
                    <PostView
                      key={post.id}
                      title={post.title}
                      content={post.content}
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="secondary" onClick={() => this.handlingDelete(post.id)}>삭제하기</Button>
                </CardActions>
              </Card>
              )
            }
          </div>

        </Container>

      </div>
    );
  }
}

export default App;
