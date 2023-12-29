import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useFetch from '../../hooks/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import Company from '../../components/jobdetails/company/Company';
import Tabs from '../../components/jobdetails/tabs/Tabs';
import About from '../../components/jobdetails/about/About';
import Specifics from '../../components/jobdetails/specifics/Specifics';
import Footer from '../../components/jobdetails/footer/Footer';
const tab = ["About", "Qualifications", "Responsibilities"]

const JobDetails = () => {
    const params = useGlobalSearchParams()
    const [activeTabs, setActiveTabs] = useState(tab[0])

    const router = useRouter()
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {

    }

    const displayTabContent = () => {
        switch (activeTabs) {
            case "Qualifications":
                return (
                    <Specifics
                        title='Qualifications'
                        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );

            case "About":
                return (
                    <About info={data[0].job_description ?? "No data provided"} />
                );

            case "Responsibilities":
                return (
                    <Specifics
                        title='Responsibilities'
                        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                );

            default:
                return null;
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={() => router.back()} />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension='60%'
                    />
                ),
                headerTitle: ''
            }} />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
                {
                    isLoading ? (<ActivityIndicator size='large' color={COLORS.primary} />) : error ? (
                        <Text>Somthing Went Wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No Data</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                companyTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />
                            <Tabs tab={tab} activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
                            {displayTabContent()}

                        </View>
                    )
                }
            </ScrollView>
            <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
        </SafeAreaView>

    );
};

export default JobDetails;