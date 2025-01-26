import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  video_quality: { type: String, required: true },
  upload_id: { type: String, required: true },
  tracks: { type: Object, required: true },
  test: { type: Boolean, required: true },
  status: { type: String, required: true },
  resolution_tier: { type: String, required: true },
  progress: {
    type: {
      state: { type: String, required: true }
    },
    required: true
  },
  playback_ids: {
    type: [
      {
        policy: { type: String, required: true },
        id: { type: String, required: true }
      }
    ],
    required: true
  },
  mp4_support: { type: String, required: true },
  max_stored_resolution: { type: String, required: true },
  max_stored_frame_rate: { type: Number, required: true },
  max_resolution_tier: { type: String, required: true },
  master_access: { type: String, required: true },
  ingest_type: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  encoding_tier: { type: String, required: true },
  duration: { type: Number, required: true },
  created_at: { type: Number, required: true },
  aspect_ratio: { type: String, required: true }
});

export default mongoose.models.Video || mongoose.model('Video', videoSchema);
