import PrimaryButton from "../components/PrimaryButton";
import Container from "../components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-secondary font-semibold mb-2">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-heading mb-4">Page not found</h1>
      <p className="text-body max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <PrimaryButton to="/" icon="ArrowRight">
        Back to Home
      </PrimaryButton>
    </Container>
  );
}
