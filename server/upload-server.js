import Express from 'express';

import S3Router from 'react-s3-uploader/s3router';

app = Express();

app.use('/s3', S3Router({
    bucket: process.env.S3_BUCKET,
    headers: {'Access-Control-Allow-Origin': '*'}
}));

app.listen(process.env.UPLOADS_PORT, function () {
  console.log('Uploads server listening on port ' + process.env.UPLOADS_PORT);
});
