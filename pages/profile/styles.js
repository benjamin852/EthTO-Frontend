import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Profile_root_padding: {
    paddingTop: '1%',
    paddingLeft: '10%',
    paddingRight: '10%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  Profile_cover_photo: {
    objectFit: 'cover',
    width: '100%',
    height: '200px',
  },
});

export { useStyles };
