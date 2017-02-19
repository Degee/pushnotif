export default function loadAuth(req, res) {
  res.json(req.session.user || null);
}