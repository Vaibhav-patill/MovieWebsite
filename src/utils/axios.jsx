import axios from "axios";

const instance=axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTc2ZTAwY2I4YmQ3ZTRkYWVhZmYxYWMzMmVjMmM0NCIsIm5iZiI6MTczODY5MzgyOS43NjYsInN1YiI6IjY3YTI1Y2M1MGY5NmY0MTZkZjAzMjAyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kk0YXfm5Sw-1tUGMkQQm2zhGLZYTjtvml_fdc83avzg'
      },
});

export default instance;