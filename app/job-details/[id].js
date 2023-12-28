import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import useFetch from '../../hooks/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import Company from '../../components/jobdetails/company/Company';
import Tabs from '../../components/jobdetails/tabs/Tabs';

const JobDetails = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })
    const tabs = ["About", "Qualifications", "Responsibility"]

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {

    }
    const [activeTabs, setActiveTabs] = useState(tabs[0])
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
                            <Tabs tab={tabs} activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>

    );
};

export default JobDetails;