import LanguagePage from "@/components/page/filter/LanguagePage";

const LanguagePageContainer = ({ params: { languageTerm } }: { params: { languageTerm: any } }) => {

    return (
        <>
            <div>
                <LanguagePage onSelectLanguage={languageTerm} />
            </div>
        </>
    );
};

export default LanguagePageContainer;