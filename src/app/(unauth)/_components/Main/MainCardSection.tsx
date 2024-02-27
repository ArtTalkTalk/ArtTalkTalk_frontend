import CardContainer from '@/components/Card/CardContainer';

function MainCardSection() {
  return (
    <div className="flex-center mt-25">
      <CardContainer type="main" categoryType={'전체'} />
    </div>
  );
}

export default MainCardSection;
